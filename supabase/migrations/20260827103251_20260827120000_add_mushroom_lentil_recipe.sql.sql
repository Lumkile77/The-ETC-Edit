/*
# Add the fourth recipe: Mushroom Lentil

1. New Data
- Adds one recipe named `Mushroom Lentil` with the ingredients, method, serving size, and vegan note shown in the supplied recipe image.
- Adds one visible recipe creation linked to the new recipe so it appears in the public gallery and homepage feed.

2. Existing Tables
- `recipes`: adds one row with the fourth recipe's full details and its public image path.
- `creations`: adds one recipe card linked to the new `recipes` row.

3. Security
- No permissions or row-level security rules are changed.
- The existing public read policies allow visitors to see the new recipe and creation.

4. Important Notes
- The image path points to `/images/mushroom-lentil.jpeg`, which must be included in the site's public images when the changes are deployed.
- The insertion is guarded so running this migration again does not create duplicate recipe content.
*/

DO $$
DECLARE
  new_recipe_id uuid;
BEGIN
  SELECT r.id INTO new_recipe_id FROM recipes AS r WHERE r.title = 'Mushroom Lentil' LIMIT 1;

  IF new_recipe_id IS NULL THEN
    INSERT INTO recipes (
      title,
      intro,
      image_url,
      ingredients,
      method,
      yield,
      notes
    ) VALUES (
      'Mushroom Lentil',
      'A simple, hearty, and completely vegan lentil and mushroom dish.',
      '/images/mushroom-lentil.jpeg',
      ARRAY[
        '1 1/2 cups large brown lentil',
        '1 punnet mushroom',
        '1 tablespoon olive oil',
        '1 onion',
        '1 teaspoon salt'
      ],
      ARRAY[
        'Wash and boil lentils',
        'Chop onion',
        'Chop mushroom into cubes',
        'Braise onion in olive oil for 3 mins',
        'Add mushroom, until cooked',
        'Add lentils and salt',
        'Garnish with mint (optional)'
      ],
      'Serving: 5',
      '100% Vegan'
    )
    RETURNING id INTO new_recipe_id;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM creations AS c WHERE c.recipe_id = new_recipe_id
  ) THEN
    INSERT INTO creations (
      title,
      description,
      category,
      image_url,
      is_featured,
      is_hidden,
      recipe_id
    ) VALUES (
      'Mushroom Lentil',
      'A simple, hearty, and completely vegan lentil and mushroom dish.',
      'recipe',
      '/images/mushroom-lentil.jpeg',
      true,
      false,
      new_recipe_id
    );
  END IF;
END $$;