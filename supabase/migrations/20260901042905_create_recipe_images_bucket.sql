/*
# Create public storage bucket for recipe/creation images

1. Storage
- Create a public bucket named `creations` to store uploaded images.
- Public read access (anon + authenticated) so visitors can view images.
- Only authenticated users (admin) can insert/update/delete objects.

2. Security
- RLS policies on storage.objects for the `creations` bucket:
  - SELECT: public (anon, authenticated) — anyone can view images.
  - INSERT/UPDATE/DELETE: authenticated only — only the admin can manage images.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('creations', 'creations', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
DROP POLICY IF EXISTS "public_read_creations_bucket" ON storage.objects;
CREATE POLICY "public_read_creations_bucket" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'creations');

-- Authenticated insert
DROP POLICY IF EXISTS "auth_insert_creations_bucket" ON storage.objects;
CREATE POLICY "auth_insert_creations_bucket" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'creations');

-- Authenticated update
DROP POLICY IF EXISTS "auth_update_creations_bucket" ON storage.objects;
CREATE POLICY "auth_update_creations_bucket" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'creations') WITH CHECK (bucket_id = 'creations');

-- Authenticated delete
DROP POLICY IF EXISTS "auth_delete_creations_bucket" ON storage.objects;
CREATE POLICY "auth_delete_creations_bucket" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'creations');