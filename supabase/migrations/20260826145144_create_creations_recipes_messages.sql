/*
# Create tables for creations, recipes, and messages

1. New Tables
- `creations`: showcase items (candles, treats, recipes) displayed in the gallery.
  - `id` uuid primary key
  - `title` text, not null
  - `description` text, nullable
  - `category` text (candle | treat | recipe), not null
  - `image_url` text, not null
  - `is_featured` boolean, default false
  - `is_hidden` boolean, default false
  - `recipe_id` uuid, nullable, references recipes(id) on delete set null
  - `created_at` timestamptz, default now()
- `recipes`: full recipe details linked from creations.
  - `id` uuid primary key
  - `title` text, not null
  - `intro` text, nullable
  - `image_url` text, nullable
  - `ingredients` text[], nullable
  - `method` text[], nullable
  - `yield` text, nullable
  - `notes` text, nullable
  - `created_at` timestamptz, default now()
- `messages`: visitor enquiries and recipe questions.
  - `id` uuid primary key
  - `name` text, not null
  - `email` text, not null
  - `topic` text (recipe | candle | custom | general), not null
  - `message` text, not null
  - `related_creation_id` uuid, nullable, references creations(id) on delete set null
  - `created_at` timestamptz, default now()

2. Security
- Enable RLS on all three tables.
- creations: public read (anon + authenticated) for non-hidden items; full CRUD for authenticated users (admin).
- recipes: public read; full CRUD for authenticated users.
- messages: public insert (visitors can submit); read/delete for authenticated users only.

3. Important Notes
- This is a single-admin showcase site. Authenticated users are the site owner who manages content.
- Public visitors can view non-hidden creations, view recipes, and submit messages.
- Only authenticated users can create, update, or delete content, and read submitted messages.
*/

CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  intro text,
  image_url text,
  ingredients text[],
  method text[],
  yield text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS creations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('candle', 'treat', 'recipe')),
  image_url text NOT NULL,
  is_featured boolean NOT NULL DEFAULT false,
  is_hidden boolean NOT NULL DEFAULT false,
  recipe_id uuid REFERENCES recipes(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  topic text NOT NULL CHECK (topic IN ('recipe', 'candle', 'custom', 'general')),
  message text NOT NULL,
  related_creation_id uuid REFERENCES creations(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- creations: public read non-hidden, authenticated full CRUD
DROP POLICY IF EXISTS "public_select_creations" ON creations;
CREATE POLICY "public_select_creations" ON creations FOR SELECT
  TO anon, authenticated USING (is_hidden = false);

DROP POLICY IF EXISTS "auth_insert_creations" ON creations;
CREATE POLICY "auth_insert_creations" ON creations FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_creations" ON creations;
CREATE POLICY "auth_update_creations" ON creations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_creations" ON creations;
CREATE POLICY "auth_delete_creations" ON creations FOR DELETE
  TO authenticated USING (true);

-- recipes: public read, authenticated full CRUD
DROP POLICY IF EXISTS "public_select_recipes" ON recipes;
CREATE POLICY "public_select_recipes" ON recipes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_recipes" ON recipes;
CREATE POLICY "auth_insert_recipes" ON recipes FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_recipes" ON recipes;
CREATE POLICY "auth_update_recipes" ON recipes FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_recipes" ON recipes;
CREATE POLICY "auth_delete_recipes" ON recipes FOR DELETE
  TO authenticated USING (true);

-- messages: public insert, authenticated read/delete
DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_messages" ON messages;
CREATE POLICY "auth_select_messages" ON messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_delete_messages" ON messages;
CREATE POLICY "auth_delete_messages" ON messages FOR DELETE
  TO authenticated USING (true);

-- Index for featured queries
CREATE INDEX IF NOT EXISTS idx_creations_featured ON creations(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_creations_category ON creations(category);
