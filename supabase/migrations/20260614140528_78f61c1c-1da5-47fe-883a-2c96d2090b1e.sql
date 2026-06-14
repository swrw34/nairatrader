
DROP POLICY "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY "Anyone can submit payment proof" ON public.payment_proofs;
REVOKE INSERT ON public.contact_submissions FROM anon, authenticated;
REVOKE INSERT ON public.payment_proofs FROM anon, authenticated;

-- Storage policy: allow anyone to upload (PUT) to payment-proofs bucket but never read
CREATE POLICY "Anyone can upload payment proof screenshots"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment-proofs');
