import { useState, FormEvent, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import type { Creation, Recipe, Message } from '../../lib/types'
import { TOPIC_LABELS } from '../../lib/types'

type Tab = 'creations' | 'recipes' | 'messages'

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [tab, setTab] = useState<Tab>('creations')
  const [creations, setCreations] = useState<Creation[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreationForm, setShowCreationForm] = useState(false)
  const [editingCreation, setEditingCreation] = useState<Creation | null>(null)
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    const [{ data: cr }, { data: rc }, { data: msg }] = await Promise.all([
      supabase.from('creations').select('*').order('created_at', { ascending: false }),
      supabase.from('recipes').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
    ])
    setCreations(cr ?? [])
    setRecipes(rc ?? [])
    setMessages(msg ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function toggleHidden(c: Creation) {
    await supabase.from('creations').update({ is_hidden: !c.is_hidden }).eq('id', c.id)
    loadData()
  }

  async function toggleFeatured(c: Creation) {
    await supabase.from('creations').update({ is_featured: !c.is_featured }).eq('id', c.id)
    loadData()
  }

  async function deleteCreation(id: string) {
    if (!confirm('Delete this creation permanently?')) return
    await supabase.from('creations').delete().eq('id', id)
    loadData()
  }

  async function deleteMessage(id: string) {
    await supabase.from('messages').delete().eq('id', id)
    loadData()
  }

  async function deleteRecipe(id: string) {
    if (!confirm('Delete this recipe permanently? This will also remove it from any linked creation.')) return
    await supabase.from('recipes').delete().eq('id', id)
    loadData()
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="border-b border-cream-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="font-serif text-2xl font-semibold text-cream-800">Admin</h1>
          <div className="flex items-center gap-3">
            <Link to="/admin/manual" className="btn-primary">
              Help / Manual
            </Link>
            <button onClick={signOut} className="btn-ghost">Sign out</button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {(['creations', 'recipes', 'messages'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-all ${
                tab === t ? 'bg-cream-700 text-cream-50 shadow-md' : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
              }`}
            >
              {t}
              {t === 'messages' && messages.length > 0 && (
                <span className="ml-2 rounded-full bg-wine-500 px-2 py-0.5 text-xs text-cream-50">{messages.length}</span>
              )}
            </button>
          ))}
          <Link
            to="/admin/manual"
            className="rounded-full bg-cream-100 px-5 py-2 text-sm font-medium text-ink-600 transition-all hover:bg-cream-200"
          >
            User Manual
          </Link>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-cream-700" />
          </div>
        ) : tab === 'creations' ? (
          <div>
            <div className="mb-4 flex justify-between">
              <h2 className="font-serif text-xl font-semibold text-ink-800">Creations</h2>
              <button onClick={() => { setEditingCreation(null); setShowCreationForm(true) }} className="btn-primary">+ Add Creation</button>
            </div>

            {showCreationForm && (
              <CreationForm creation={editingCreation} recipes={recipes} onDone={() => { setShowCreationForm(false); loadData() }} />
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {creations.map((c) => (
                <div key={c.id} className="card overflow-hidden">
                  <img src={c.image_url} alt={c.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-ink-800">{c.title}</h3>
                    <p className="text-xs uppercase text-cream-600">{c.category}</p>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => toggleFeatured(c)} className={`rounded-full px-3 py-1 text-xs font-medium ${c.is_featured ? 'bg-cream-700 text-cream-50' : 'bg-cream-100 text-ink-500'}`}>
                        {c.is_featured ? 'Featured' : 'Feature'}
                      </button>
                      <button onClick={() => toggleHidden(c)} className={`rounded-full px-3 py-1 text-xs font-medium ${c.is_hidden ? 'bg-wine-500 text-cream-50' : 'bg-cream-100 text-ink-500'}`}>
                        {c.is_hidden ? 'Hidden' : 'Visible'}
                      </button>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { setEditingCreation(c); setShowCreationForm(true) }} className="text-xs text-cream-700 hover:underline">Edit</button>
                      <button onClick={() => deleteCreation(c.id)} className="text-xs text-wine-600 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : tab === 'recipes' ? (
          <div>
            <div className="mb-4 flex justify-between">
              <h2 className="font-serif text-xl font-semibold text-ink-800">Recipes</h2>
              <button onClick={() => { setEditingRecipe(null); setShowRecipeForm(true) }} className="btn-primary">+ Add Recipe</button>
            </div>

            {showRecipeForm && (
              <RecipeForm recipe={editingRecipe} onDone={() => { setShowRecipeForm(false); loadData() }} />
            )}

            <div className="space-y-3">
              {recipes.map((r) => (
                <div key={r.id} className="card flex items-center gap-4 p-4">
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.title} className="h-16 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-cream-100 text-cream-400">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-ink-800">{r.title}</h3>
                    {r.intro && <p className="line-clamp-1 text-sm text-ink-500">{r.intro}</p>}
                    <p className="text-xs text-ink-400">{r.ingredients?.length ?? 0} ingredients</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingRecipe(r); setShowRecipeForm(true) }} className="text-xs text-cream-700 hover:underline">Edit</button>
                    <button onClick={() => deleteRecipe(r.id)} className="text-xs text-wine-600 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-ink-800">Messages</h2>
            {messages.length === 0 ? (
              <p className="text-ink-400">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="card p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-ink-800">{m.name}</p>
                        <p className="text-sm text-cream-600">{m.email}</p>
                        <span className="mt-1 inline-block rounded-full bg-cream-100 px-3 py-1 text-xs text-ink-500">{TOPIC_LABELS[m.topic]}</span>
                      </div>
                      <button onClick={() => deleteMessage(m.id)} className="text-xs text-wine-600 hover:underline">Delete</button>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{m.message}</p>
                    <p className="mt-2 text-xs text-ink-300">{new Date(m.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

async function uploadImage(file: File, oldPath?: string | null): Promise<{ url: string; path: string } | null> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `recipes/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  if (oldPath) {
    const oldFile = oldPath.split('/').pop()
    if (oldFile) await supabase.storage.from('creations').remove([`recipes/${oldFile}`])
  }

  const { error } = await supabase.storage.from('creations').upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) return null

  const { data } = supabase.storage.from('creations').getPublicUrl(path)
  return { url: data.publicUrl, path }
}

function imagePathFromUrl(url: string): string | null {
  const idx = url.indexOf('/creations/recipes/')
  if (idx === -1) return null
  return decodeURIComponent(url.slice(idx + '/creations/'.length))
}

function CreationForm({ creation, recipes, onDone }: { creation: Creation | null; recipes: Recipe[]; onDone: () => void }) {
  const [title, setTitle] = useState(creation?.title ?? '')
  const [description, setDescription] = useState(creation?.description ?? '')
  const [category, setCategory] = useState<Creation['category']>(creation?.category ?? 'candle')
  const [imageUrl, setImageUrl] = useState(creation?.image_url ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isFeatured, setIsFeatured] = useState(creation?.is_featured ?? false)
  const [recipeId, setRecipeId] = useState(creation?.recipe_id ?? '')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [recipeIntro, setRecipeIntro] = useState('')
  const [recipeIngredients, setRecipeIngredients] = useState('')
  const [recipeMethod, setRecipeMethod] = useState('')
  const [recipeYield, setRecipeYield] = useState('')
  const [recipeNotes, setRecipeNotes] = useState('')

  useEffect(() => {
    if (creation?.recipe_id) {
      const r = recipes.find((x) => x.id === creation.recipe_id)
      if (r) {
        setRecipeIntro(r.intro ?? '')
        setRecipeIngredients((r.ingredients ?? []).join('\n'))
        setRecipeMethod((r.method ?? []).join('\n'))
        setRecipeYield(r.yield ?? '')
        setRecipeNotes(r.notes ?? '')
      }
    }
  }, [creation, recipes])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const url = URL.createObjectURL(file)
    setImageUrl(url)
  }

  function removeImage() {
    setImageFile(null)
    setImageUrl('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)

    let finalImageUrl = imageUrl
    let storedPath: string | null = null

    if (imageFile) {
      setUploading(true)
      const oldPath = creation?.image_url ? imagePathFromUrl(creation.image_url) : null
      const result = await uploadImage(imageFile, oldPath)
      setUploading(false)
      if (result) {
        finalImageUrl = result.url
        storedPath = result.path
      }
    }

    let finalRecipeId = recipeId || null

    if (category === 'recipe' && (recipeIntro || recipeIngredients || recipeMethod)) {
      const ingredients = recipeIngredients.split('\n').map((s) => s.trim()).filter(Boolean)
      const method = recipeMethod.split('\n').map((s) => s.trim()).filter(Boolean)

      if (finalRecipeId) {
        await supabase.from('recipes').update({
          title, intro: recipeIntro || null, image_url: finalImageUrl || null,
          ingredients: ingredients.length ? ingredients : null,
          method: method.length ? method : null,
          yield: recipeYield || null, notes: recipeNotes || null,
        }).eq('id', finalRecipeId)
      } else {
        const { data } = await supabase.from('recipes').insert({
          title, intro: recipeIntro || null, image_url: finalImageUrl || null,
          ingredients: ingredients.length ? ingredients : null,
          method: method.length ? method : null,
          yield: recipeYield || null, notes: recipeNotes || null,
        }).select().single()
        if (data) finalRecipeId = data.id
      }
    }

    const payload = {
      title, description: description || null, category,
      image_url: finalImageUrl, is_featured: isFeatured, is_hidden: false,
      recipe_id: finalRecipeId,
    }

    if (creation) {
      await supabase.from('creations').update(payload).eq('id', creation.id)
    } else {
      await supabase.from('creations').insert(payload)
    }

    setSaving(false)
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-cream-300 bg-white p-6">
      <h3 className="mb-4 font-serif text-lg font-semibold text-ink-800">{creation ? 'Edit Creation' : 'New Creation'}</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-700">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-700">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as Creation['category'])} className="input-field">
            <option value="candle">Candle</option>
            <option value="treat">Treat</option>
            <option value="recipe">Recipe</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-ink-700">Image</label>
        {imageUrl ? (
          <div className="flex items-center gap-4">
            <img src={imageUrl} alt="Preview" className="h-24 w-24 rounded-lg object-cover" />
            <div className="flex gap-2">
              <label className="cursor-pointer rounded-full bg-cream-100 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-cream-200">
                Replace
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              <button type="button" onClick={removeImage} className="rounded-full bg-wine-50 px-4 py-2 text-sm font-medium text-wine-600 hover:bg-wine-100">Remove</button>
            </div>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-cream-300 bg-cream-50 p-6 hover:border-cream-400">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="mt-2 text-sm text-ink-500">Click to upload an image</p>
            </div>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}
        {uploading && <p className="mt-2 text-xs text-cream-600">Uploading image...</p>}
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-ink-700">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input-field resize-none" />
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-cream-300 text-cream-700 focus:ring-cream-500" />
          Feature this creation on the homepage
        </label>
      </div>

      {category === 'recipe' && (
        <div className="mt-6 rounded-xl border border-cream-200 bg-cream-50 p-4">
          <h4 className="mb-3 font-serif text-base font-semibold text-cream-800">Recipe Details</h4>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-600">Intro</label>
              <textarea value={recipeIntro} onChange={(e) => setRecipeIntro(e.target.value)} rows={2} className="input-field resize-none" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-600">Ingredients (one per line)</label>
                <textarea value={recipeIngredients} onChange={(e) => setRecipeIngredients(e.target.value)} rows={5} className="input-field resize-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-600">Method (one step per line)</label>
                <textarea value={recipeMethod} onChange={(e) => setRecipeMethod(e.target.value)} rows={5} className="input-field resize-none" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-600">Yield</label>
                <input value={recipeYield} onChange={(e) => setRecipeYield(e.target.value)} className="input-field" placeholder="Makes 12 squares" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-600">Notes</label>
                <input value={recipeNotes} onChange={(e) => setRecipeNotes(e.target.value)} className="input-field" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
          {saving ? (uploading ? 'Uploading...' : 'Saving...') : 'Save'}
        </button>
        <button type="button" onClick={onDone} className="btn-secondary">Cancel</button>
      </div>
    </form>
  )
}

function RecipeForm({ recipe, onDone }: { recipe: Recipe | null; onDone: () => void }) {
  const [title, setTitle] = useState(recipe?.title ?? '')
  const [intro, setIntro] = useState(recipe?.intro ?? '')
  const [ingredients, setIngredients] = useState((recipe?.ingredients ?? []).join('\n'))
  const [method, setMethod] = useState((recipe?.method ?? []).join('\n'))
  const [yieldVal, setYieldVal] = useState(recipe?.yield ?? '')
  const [notes, setNotes] = useState(recipe?.notes ?? '')
  const [imageUrl, setImageUrl] = useState(recipe?.image_url ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImageUrl(URL.createObjectURL(file))
  }

  function removeImage() {
    setImageFile(null)
    setImageUrl('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)

    let finalImageUrl = imageUrl

    if (imageFile) {
      setUploading(true)
      const oldPath = recipe?.image_url ? imagePathFromUrl(recipe.image_url) : null
      const result = await uploadImage(imageFile, oldPath)
      setUploading(false)
      if (result) finalImageUrl = result.url
    }

    const ingArr = ingredients.split('\n').map((s) => s.trim()).filter(Boolean)
    const methodArr = method.split('\n').map((s) => s.trim()).filter(Boolean)

    const payload = {
      title, intro: intro || null, image_url: finalImageUrl || null,
      ingredients: ingArr.length ? ingArr : null,
      method: methodArr.length ? methodArr : null,
      yield: yieldVal || null, notes: notes || null,
    }

    if (recipe) {
      await supabase.from('recipes').update(payload).eq('id', recipe.id)
    } else {
      const { data } = await supabase.from('recipes').insert(payload).select().single()
      if (data) {
        await supabase.from('creations').insert({
          title, category: 'recipe', image_url: finalImageUrl ?? '',
          is_featured: false, is_hidden: false, recipe_id: data.id,
        })
      }
    }

    setSaving(false)
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-cream-300 bg-white p-6">
      <h3 className="mb-4 font-serif text-lg font-semibold text-ink-800">{recipe ? 'Edit Recipe' : 'New Recipe'}</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-700">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-700">Yield</label>
          <input value={yieldVal} onChange={(e) => setYieldVal(e.target.value)} className="input-field" placeholder="Makes 12 squares" />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-ink-700">Image</label>
        {imageUrl ? (
          <div className="flex items-center gap-4">
            <img src={imageUrl} alt="Preview" className="h-24 w-24 rounded-lg object-cover" />
            <div className="flex gap-2">
              <label className="cursor-pointer rounded-full bg-cream-100 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-cream-200">
                Replace
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              <button type="button" onClick={removeImage} className="rounded-full bg-wine-50 px-4 py-2 text-sm font-medium text-wine-600 hover:bg-wine-100">Remove</button>
            </div>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-cream-300 bg-cream-50 p-6 hover:border-cream-400">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="mt-2 text-sm text-ink-500">Click to upload an image</p>
            </div>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}
        {uploading && <p className="mt-2 text-xs text-cream-600">Uploading image...</p>}
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-ink-700">Intro</label>
        <textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={2} className="input-field resize-none" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-700">Ingredients (one per line)</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={6} className="input-field resize-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-700">Steps (one per line)</label>
          <textarea value={method} onChange={(e) => setMethod(e.target.value)} rows={6} className="input-field resize-none" />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-ink-700">Notes</label>
        <input value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field" />
      </div>

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
          {saving ? (uploading ? 'Uploading...' : 'Saving...') : 'Save'}
        </button>
        <button type="button" onClick={onDone} className="btn-secondary">Cancel</button>
      </div>
    </form>
  )
}
