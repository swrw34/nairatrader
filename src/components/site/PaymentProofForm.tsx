import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitPaymentProof } from "@/lib/api/submissions.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  plan: z.enum(["mentorship", "vip"]),
  crypto: z.enum(["BTC", "USDT", "ETH"]),
  tx_hash: z.string().trim().min(6, "Transaction hash too short").max(200),
  notes: z.string().trim().max(1000).optional(),
  hp: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

export function PaymentProofForm({ initialPlan = "vip" }: { initialPlan?: "mentorship" | "vip" }) {
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const send = useServerFn(submitPaymentProof);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", plan: initialPlan, crypto: "USDT", tx_hash: "", notes: "", hp: "" },
  });

  // Keep form's plan in sync if parent changes
  useEffect(() => { setValue("plan", initialPlan); }, [initialPlan, setValue]);

  const plan = watch("plan");
  const crypto = watch("crypto");

  const onSubmit = async (values: Values) => {
    try {
      let screenshot_path = "";
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Screenshot must be 5MB or less");
          return;
        }
        if (!file.type.startsWith("image/")) {
          toast.error("Screenshot must be an image");
          return;
        }
        const ext = file.name.split(".").pop() || "png";
        const path = `${crypto}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (upErr) {
          console.error(upErr);
          toast.error("Couldn't upload screenshot. Try without it.");
          return;
        }
        screenshot_path = path;
      }

      await send({
        data: {
          ...values,
          notes: values.notes ?? "",
          hp: values.hp ?? "",
          screenshot_path,
        },
      });
      setDone(true);
      reset({ ...values, name: "", email: "", tx_hash: "", notes: "" });
      setFile(null);
      toast.success("Proof submitted!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    }
  };

  if (done) {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/5 p-6 text-center">
        <h3 className="font-display text-lg font-semibold">Proof received 🎉</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll verify your payment and email the Telegram group link shortly.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setDone(false)}>Submit another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("hp")} />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="you@example.com" />
        </Field>
      </div>

      <Field label="Plan" error={errors.plan?.message}>
        <RadioGroup
          value={plan}
          onValueChange={(v) => setValue("plan", v as "mentorship" | "vip")}
          className="grid grid-cols-2 gap-2"
        >
          <PlanRadio value="mentorship" label="Mentorship" sub="$5" current={plan} />
          <PlanRadio value="vip" label="VIP Signals" sub="$10" current={plan} />
        </RadioGroup>
      </Field>

      <Field label="Crypto used" error={errors.crypto?.message}>
        <RadioGroup
          value={crypto}
          onValueChange={(v) => setValue("crypto", v as "BTC" | "USDT" | "ETH")}
          className="grid grid-cols-3 gap-2"
        >
          {(["BTC", "USDT", "ETH"] as const).map((c) => (
            <PlanRadio key={c} value={c} label={c} current={crypto} />
          ))}
        </RadioGroup>
      </Field>

      <Field label="Transaction hash / TXID" error={errors.tx_hash?.message}>
        <Input {...register("tx_hash")} placeholder="0x… or T…" className="font-mono text-xs" />
      </Field>

      <Field label="Screenshot (optional)">
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </Field>

      <Field label="Notes (optional)" error={errors.notes?.message}>
        <Textarea rows={3} {...register("notes")} placeholder="Anything we should know?" />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-gold text-ink hover:bg-gold-soft font-semibold">
        {isSubmitting ? "Submitting…" : "Submit payment proof"}
      </Button>
    </form>
  );
}

function PlanRadio({ value, label, sub, current }: { value: string; label: string; sub?: string; current: string }) {
  const active = value === current;
  return (
    <label className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm flex items-center justify-between transition ${active ? "border-gold bg-gold/10" : "border-border"}`}>
      <span className="font-medium">{label}</span>
      {sub && <span className="text-muted-foreground text-xs">{sub}</span>}
      <RadioGroupItem value={value} className="sr-only" />
    </label>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
