import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(5).max(2000),
  hp: z.string().max(0).optional().default(""), // honeypot
});

const proofSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  plan: z.enum(["mentorship", "vip"]),
  crypto: z.enum(["BTC", "USDT", "ETH"]),
  tx_hash: z.string().trim().min(6).max(200),
  notes: z.string().trim().max(1000).optional().default(""),
  screenshot_path: z.string().trim().max(500).optional().default(""),
  hp: z.string().max(0).optional().default(""),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.hp) return { ok: true }; // bot trap, silently succeed
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error("contact insert", error);
      throw new Error("Could not submit your message. Please try again.");
    }
    return { ok: true };
  });

export const submitPaymentProof = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => proofSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.hp) return { ok: true };
    const amount = data.plan === "vip" ? 10 : 5;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("payment_proofs").insert({
      name: data.name,
      email: data.email,
      plan: data.plan,
      amount_usd: amount,
      crypto: data.crypto,
      tx_hash: data.tx_hash,
      notes: data.notes || null,
      screenshot_path: data.screenshot_path || null,
    });
    if (error) {
      console.error("proof insert", error);
      throw new Error("Could not submit your proof. Please try again.");
    }
    return { ok: true };
  });
