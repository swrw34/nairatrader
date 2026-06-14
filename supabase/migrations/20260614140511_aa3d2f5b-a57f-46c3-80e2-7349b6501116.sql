
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TYPE public.plan_type AS ENUM ('mentorship', 'vip');
CREATE TYPE public.crypto_type AS ENUM ('BTC', 'USDT', 'ETH');
CREATE TYPE public.proof_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.payment_proofs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  plan public.plan_type NOT NULL,
  amount_usd numeric(10,2) NOT NULL,
  crypto public.crypto_type NOT NULL,
  tx_hash text NOT NULL,
  screenshot_path text,
  notes text,
  status public.proof_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.payment_proofs TO anon, authenticated;
GRANT ALL ON public.payment_proofs TO service_role;
ALTER TABLE public.payment_proofs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit payment proof" ON public.payment_proofs FOR INSERT TO anon, authenticated WITH CHECK (true);
