import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Recipe } from '../lib/types'

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!id) return
      const { data } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      setRecipe(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-cream-700" />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-32 pb-20 text-center">
        <h1 className="font-serif text-4xl font-semibold text-ink-800">Recipe not found</h1>
        <p className="mt-4 text-ink-500">This recipe may have been removed.</p>
        <Link to="/gallery" className="btn-primary mt-8">Back to Gallery</Link>
      </div>
    )
  }

  return (
    <div className="pt-28">
      {/* Hero image */}
      {recipe.image_url && (
        <div className="relative h-64 w-full overflow-hidden sm:h-96">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h1 className="font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
              {recipe.title}
            </h1>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {!recipe.image_url && (
          <h1 className="mb-6 text-center font-serif text-4xl font-semibold text-ink-800 sm:text-5xl">
            {recipe.title}
          </h1>
        )}

        {recipe.intro && (
          <p className="mb-10 text-center text-lg leading-relaxed text-ink-600">
            {recipe.intro}
          </p>
        )}

        {recipe.yield && (
          <div className="mb-8 flex justify-center">
            <span className="rounded-full bg-cream-200 px-4 py-2 text-sm font-medium text-cream-800">
              {recipe.yield}
            </span>
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-800">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cream-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Method */}
          {recipe.method && recipe.method.length > 0 && (
            <div>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-800">
                Method
              </h2>
              <ol className="space-y-4">
                {recipe.method.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cream-700 text-sm font-medium text-cream-50">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-ink-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Notes */}
        {recipe.notes && (
          <div className="mt-10 rounded-xl border border-cream-200 bg-cream-100 p-6">
            <h3 className="mb-2 font-serif text-lg font-semibold text-cream-800">Notes</h3>
            <p className="text-sm leading-relaxed text-ink-600">{recipe.notes}</p>
          </div>
        )}

        {/* Ask a question CTA */}
        <div className="mt-12 rounded-2xl bg-cream-700 p-8 text-center text-cream-50">
          <h3 className="font-serif text-2xl font-semibold">Having trouble with this recipe?</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream-100">
            If something didn't turn out right or you need advice on substitutions,
            send a message and you'll get a personal reply.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-cream-50 px-6 py-3 text-sm font-medium text-cream-800 transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            Ask about this recipe
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/gallery" className="btn-ghost">
            &larr; Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}
