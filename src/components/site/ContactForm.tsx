import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContact } from "@/lib/api/submissions.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5, "Message is too short").max(2000),
  hp: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const send = useServerFn(submitContact);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "", hp: "" },
  });

  const onSubmit = async (values: Values) => {
    try {
      await send({ data: { ...values, subject: values.subject ?? "", hp: values.hp ?? "" } });
      setDone(true);
      reset();
      toast.success("Message sent. We'll be in touch.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    }
  };

  if (done) {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/5 p-6 text-center">
        <h3 className="font-display text-lg font-semibold">Thanks — message received.</h3>
        <p className="mt-1 text-sm text-muted-foreground">We'll reply by email shortly.</p>
        <Button variant="outline" className="mt-4" onClick={() => setDone(false)}>Send another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("hp")} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="you@example.com" />
        </Field>
      </div>
      <Field label="Subject" error={errors.subject?.message}>
        <Input {...register("subject")} placeholder="What's this about?" />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <Textarea rows={5} {...register("message")} placeholder="Tell us what you need…" />
      </Field>
      <Button type="submit" disabled={isSubmitting} className="bg-ink text-white hover:bg-ink/90 font-semibold">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
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
