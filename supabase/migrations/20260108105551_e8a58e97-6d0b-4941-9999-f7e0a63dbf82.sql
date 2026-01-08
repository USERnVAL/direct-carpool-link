-- Fix overly permissive RLS policy for contact_messages
-- Drop the permissive policy
DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;

-- Create a more secure policy - allow insert but with rate limiting via application
CREATE POLICY "Public can create contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Validate that required fields are not empty
    nom_passager IS NOT NULL AND 
    nom_passager != '' AND
    telephone_passager IS NOT NULL AND 
    telephone_passager != '' AND
    message IS NOT NULL AND 
    message != ''
  );