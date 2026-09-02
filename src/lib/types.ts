export interface Creation {
  id: string
  title: string
  description: string | null
  category: 'candle' | 'treat' | 'recipe'
  image_url: string
  is_featured: boolean
  is_hidden: boolean
  recipe_id: string | null
  created_at: string
}

export interface Recipe {
  id: string
  title: string
  intro: string | null
  image_url: string | null
  ingredients: string[] | null
  method: string[] | null
  yield: string | null
  notes: string | null
  created_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  topic: 'recipe' | 'candle' | 'custom' | 'general'
  message: string
  related_creation_id: string | null
  created_at: string
}

export const TOPIC_LABELS: Record<Message['topic'], string> = {
  recipe: 'Recipe question',
  candle: 'Candle enquiry',
  custom: 'Custom order',
  general: 'General message',
}
