/*
# Add "craft" as a new creation category

1. Changes
- `creations.category` CHECK constraint updated to allow 'craft' in addition to 'candle', 'treat', 'recipe'.
- `messages.topic` CHECK constraint updated to allow 'craft' in addition to 'recipe', 'candle', 'custom', 'general'.

2. Security
- No RLS policy changes. Existing policies remain valid.

3. Important Notes
- This is a non-destructive change: it only widens the allowed values.
- No existing data is modified or lost.
*/

-- Drop and recreate the category check on creations to include 'craft'
ALTER TABLE creations DROP CONSTRAINT IF EXISTS creations_category_check;
ALTER TABLE creations ADD CONSTRAINT creations_category_check CHECK (category IN ('candle', 'treat', 'recipe', 'craft'));

-- Drop and recreate the topic check on messages to include 'craft'
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_topic_check;
ALTER TABLE messages ADD CONSTRAINT messages_topic_check CHECK (topic IN ('recipe', 'candle', 'custom', 'general', 'craft'));
