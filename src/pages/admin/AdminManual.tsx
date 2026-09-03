import { Link } from 'react-router-dom'
import { SITE_NAME } from '../../lib/config'

function MockFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</p>
      <div className="overflow-hidden rounded-xl border border-cream-300 bg-white shadow-sm">
        {children}
      </div>
    </div>
  )
}

function MockBar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-cream-200 bg-cream-50 px-4 py-3">
      <span className="font-serif text-sm font-semibold text-cream-800">Admin</span>
      <div className="flex items-center gap-2 text-xs">
        {children}
      </div>
    </div>
  )
}

export default function AdminManual() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="border-b border-cream-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/admin" className="font-serif text-2xl font-semibold text-cream-800">
            &larr; Back to Admin
          </Link>
          <span className="text-sm text-ink-400">Admin Manual</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-semibold text-ink-800">Admin Manual</h1>
        <p className="mt-3 text-lg text-ink-500">
          Everything you need to manage {SITE_NAME} — creations, recipes, and messages.
        </p>

        {/* Table of Contents */}
        <nav className="mt-8 rounded-2xl border border-cream-200 bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-ink-800">Contents</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#signin" className="text-cream-700 hover:underline">1. Signing In</a></li>
            <li><a href="#creations" className="text-cream-700 hover:underline">2. Managing Creations</a></li>
            <li><a href="#recipes" className="text-cream-700 hover:underline">3. Managing Recipes</a></li>
            <li><a href="#messages" className="text-cream-700 hover:underline">4. Reading &amp; Deleting Messages</a></li>
            <li><a href="#images" className="text-cream-700 hover:underline">5. Uploading Images</a></li>
            <li><a href="#tips" className="text-cream-700 hover:underline">6. Tips &amp; Shortcuts</a></li>
          </ul>
        </nav>

        {/* Section 1 */}
        <section id="signin" className="mt-10 scroll-mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">1. Signing In</h2>
          <div className="mt-4 space-y-3 text-ink-600">
            <p>
              Click <strong>Admin view</strong> at the bottom of any page. You'll be signed in
              automatically — no need to type anything.
            </p>
            <p>
              If you ever need to sign in manually, enter your email and password, then press
              <strong> Sign In</strong>.
            </p>

            <MockFrame label="What the sign-in page looks like">
              <div className="flex flex-col items-center bg-cream-100 px-6 py-10">
                <div className="w-full max-w-xs space-y-4 rounded-xl bg-white p-6 shadow-md">
                  <div className="text-center">
                    <p className="font-serif text-lg font-semibold text-cream-800">{SITE_NAME}</p>
                    <p className="text-xs text-ink-400">Admin sign in to manage content</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="mb-1 text-xs font-medium text-ink-600">Email</p>
                      <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">you@example.com</div>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-ink-600">Password</p>
                      <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">••••••••</div>
                    </div>
                    <div className="rounded-lg bg-cream-700 px-3 py-2 text-center text-xs font-medium text-cream-50">Sign In</div>
                    <p className="text-center text-xs text-cream-600 underline">Quick sign in (T)</p>
                  </div>
                </div>
              </div>
            </MockFrame>

            <div className="rounded-xl border border-cream-200 bg-cream-50 p-4">
              <p className="font-medium text-ink-800">Quick sign-in shortcut</p>
              <p className="mt-1 text-sm">
                Type the letter <kbd className="rounded bg-cream-200 px-2 py-0.5 font-mono text-xs">T</kbd> in the
                email field. Your credentials will fill in automatically — just press <strong>Sign In</strong>.
                You can also click the <strong>Quick sign in (T)</strong> button below the form.
              </p>
            </div>
            <p>
              Once signed in, the top navigation changes: the Home, Gallery, About, and Contact links disappear,
              and only a <strong>Sign out</strong> button remains. Click it any time to return to the public site.
            </p>

            <MockFrame label="Admin navigation bar (when signed in)">
              <MockBar>
                <span className="rounded-full bg-cream-700 px-3 py-1 text-cream-50">Help / Manual</span>
                <span className="rounded-full bg-cream-100 px-3 py-1 text-ink-600">Sign out</span>
              </MockBar>
            </MockFrame>
          </div>
        </section>

        {/* Section 2 */}
        <section id="creations" className="mt-10 scroll-mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">2. Managing Creations</h2>
          <div className="mt-4 space-y-3 text-ink-600">
            <p>
              The <strong>Creations</strong> tab is where you manage everything visible in the gallery and on
              the homepage. Each creation has a title, image, category, description, and optional recipe link.
            </p>

            <MockFrame label="The Creations tab with cards">
              <div>
                <MockBar />
                <div className="space-y-2 px-4 py-3">
                  <div className="flex gap-2">
                    <span className="rounded-full bg-cream-700 px-4 py-1.5 text-xs font-medium text-cream-50">creations</span>
                    <span className="rounded-full bg-cream-100 px-4 py-1.5 text-xs text-ink-500">recipes</span>
                    <span className="rounded-full bg-cream-100 px-4 py-1.5 text-xs text-ink-500">messages</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-serif text-sm font-semibold text-ink-800">Creations</span>
                    <span className="rounded-lg bg-cream-700 px-3 py-1 text-xs font-medium text-cream-50">+ Add Creation</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="overflow-hidden rounded-lg border border-cream-200">
                        <div className="h-16 bg-gradient-to-br from-cream-200 to-cream-300" />
                        <div className="p-2">
                          <p className="text-xs font-semibold text-ink-700">Creation {i}</p>
                          <p className="text-[10px] uppercase text-cream-600">candle</p>
                          <div className="mt-1 flex gap-1">
                            <span className="rounded-full bg-cream-700 px-2 py-0.5 text-[9px] text-cream-50">Featured</span>
                            <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[9px] text-ink-500">Visible</span>
                          </div>
                          <div className="mt-1 flex gap-2 text-[9px]">
                            <span className="text-cream-700 underline">Edit</span>
                            <span className="text-wine-600 underline">Delete</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MockFrame>

            <div className="rounded-xl border border-cream-200 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-ink-800">Adding a creation</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm">
                <li>Click <strong>+ Add Creation</strong> in the top-right.</li>
                <li>Enter a <strong>Title</strong> (required).</li>
                <li>Pick a <strong>Category</strong>: Candle, Treat, or Recipe.</li>
                <li>Upload an image (see <a href="#images" className="text-cream-700 hover:underline">Section 5</a> for details).</li>
                <li>Write a short <strong>Description</strong> — this appears under the title in the gallery.</li>
                <li>Tick <strong>Feature this creation on the homepage</strong> if you want it highlighted.</li>
                <li>If the category is <strong>Recipe</strong>, a recipe details panel appears — fill in the intro, ingredients, method, yield, and notes.</li>
                <li>Press <strong>Save</strong>.</li>
              </ol>
            </div>

            <MockFrame label="The creation form">
              <div className="p-4">
                <p className="mb-3 font-serif text-sm font-semibold text-ink-800">New Creation</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1 text-xs font-medium text-ink-600">Title</p>
                    <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Enter title...</div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium text-ink-600">Category</p>
                    <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Candle</div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-1 text-xs font-medium text-ink-600">Image</p>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-cream-300 bg-cream-50 py-6 text-xs text-cream-400">Click to upload image</div>
                </div>
                <div className="mt-3">
                  <p className="mb-1 text-xs font-medium text-ink-600">Description</p>
                  <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Short description...</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-4 w-4 rounded border border-cream-400 bg-cream-100" />
                  <span className="text-xs text-ink-600">Feature this creation on the homepage</span>
                </div>
                <div className="mt-3 rounded-lg bg-cream-700 px-4 py-2 text-center text-xs font-medium text-cream-50">Save</div>
              </div>
            </MockFrame>

            <div className="rounded-xl border border-cream-200 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-ink-800">Editing a creation</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm">
                <li>Find the creation in the grid.</li>
                <li>Click <strong>Edit</strong> under the card.</li>
                <li>Change any field — title, image, description, category, featured status.</li>
                <li>If the creation has a linked recipe, the recipe fields will be pre-filled. Edit them and they save automatically when you save the creation.</li>
                <li>Press <strong>Save</strong>.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-cream-200 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-ink-800">Hiding &amp; featuring</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                <li><strong>Feature</strong> — click the Feature button on a card to show it in the homepage highlights. Click again to un-feature.</li>
                <li><strong>Hide</strong> — click Visible/Hidden to toggle. A hidden creation stays in the database but disappears from the public gallery and homepage.</li>
              </ul>
            </div>

            <MockFrame label="Feature and Hide buttons on a card">
              <div className="inline-block overflow-hidden rounded-lg border border-cream-200">
                <div className="h-20 w-40 bg-gradient-to-br from-cream-200 to-cream-300" />
                <div className="p-3">
                  <p className="text-sm font-semibold text-ink-700">Sample Candle</p>
                  <p className="text-xs uppercase text-cream-600">candle</p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-cream-700 px-3 py-1 text-xs text-cream-50">Featured</span>
                    <span className="rounded-full bg-cream-100 px-3 py-1 text-xs text-ink-500">Visible</span>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs">
                    <span className="text-cream-700 underline">Edit</span>
                    <span className="text-wine-600 underline">Delete</span>
                  </div>
                </div>
              </div>
            </MockFrame>

            <div className="rounded-xl border border-wine-200 bg-wine-50 p-5">
              <h3 className="font-serif text-lg font-semibold text-wine-800">Deleting a creation</h3>
              <p className="mt-2 text-sm text-wine-700">
                Click <strong>Delete</strong> under a card and confirm. This permanently removes the creation
                and its image. If the creation has a linked recipe, the recipe stays in the Recipes tab but is
                no longer connected to a gallery card. This cannot be undone.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="recipes" className="mt-10 scroll-mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">3. Managing Recipes</h2>
          <div className="mt-4 space-y-3 text-ink-600">
            <p>
              The <strong>Recipes</strong> tab manages standalone recipes. Each recipe has a title, image, intro,
              ingredients list, method steps, yield, and notes.
            </p>

            <MockFrame label="The Recipes tab">
              <div>
                <MockBar />
                <div className="space-y-2 px-4 py-3">
                  <div className="flex gap-2">
                    <span className="rounded-full bg-cream-100 px-4 py-1.5 text-xs text-ink-500">creations</span>
                    <span className="rounded-full bg-cream-700 px-4 py-1.5 text-xs font-medium text-cream-50">recipes</span>
                    <span className="rounded-full bg-cream-100 px-4 py-1.5 text-xs text-ink-500">messages</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-serif text-sm font-semibold text-ink-800">Recipes</span>
                    <span className="rounded-lg bg-cream-700 px-3 py-1 text-xs font-medium text-cream-50">+ Add Recipe</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-cream-200 p-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cream-200 to-cream-300" />
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-ink-700">Recipe {i}</p>
                          <p className="text-[10px] text-ink-400">5 ingredients</p>
                        </div>
                        <span className="text-[10px] text-cream-700 underline">Edit</span>
                        <span className="text-[10px] text-wine-600 underline">Delete</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MockFrame>

            <div className="rounded-xl border border-cream-200 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-ink-800">Adding a recipe</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm">
                <li>Click <strong>+ Add Recipe</strong>.</li>
                <li>Enter a <strong>Title</strong> (required).</li>
                <li>Optionally upload an image.</li>
                <li>Write a short <strong>Intro</strong> — a sentence or two describing the dish.</li>
                <li>List <strong>Ingredients</strong>, one per line. Each line becomes a bullet point on the recipe page.</li>
                <li>List <strong>Steps</strong>, one per line. Each line becomes a numbered step.</li>
                <li>Add a <strong>Yield</strong> (e.g. "Makes 12 squares") and any <strong>Notes</strong> (tips, substitutions).</li>
                <li>Press <strong>Save</strong>. A gallery card for this recipe is created automatically.</li>
              </ol>
            </div>

            <MockFrame label="The recipe form">
              <div className="p-4 space-y-3">
                <p className="font-serif text-sm font-semibold text-ink-800">New Recipe</p>
                <div>
                  <p className="mb-1 text-xs font-medium text-ink-600">Title</p>
                  <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Enter title...</div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-ink-600">Intro</p>
                  <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">A sentence or two...</div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-ink-600">Ingredients (one per line)</p>
                  <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">2 cups flour<br />1 cup sugar<br />1 tsp salt</div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-ink-600">Steps (one per line)</p>
                  <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Mix dry ingredients<br />Add wet ingredients<br />Bake at 350F</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1 text-xs font-medium text-ink-600">Yield</p>
                    <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Makes 12</div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium text-ink-600">Notes</p>
                    <div className="rounded-lg border border-cream-300 bg-cream-50 px-3 py-2 text-xs text-ink-300">Tips...</div>
                  </div>
                </div>
                <div className="rounded-lg bg-cream-700 px-4 py-2 text-center text-xs font-medium text-cream-50">Save</div>
              </div>
            </MockFrame>

            <div className="rounded-xl border border-cream-200 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-ink-800">Editing a recipe</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm">
                <li>Find the recipe in the list.</li>
                <li>Click <strong>Edit</strong>.</li>
                <li>Update any field. If you upload a new image, the old one is replaced.</li>
                <li>Press <strong>Save</strong>.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-wine-200 bg-wine-50 p-5">
              <h3 className="font-serif text-lg font-semibold text-wine-800">Deleting a recipe</h3>
              <p className="mt-2 text-sm text-wine-700">
                Click <strong>Delete</strong> and confirm. This permanently removes the recipe. If a creation card
                was linked to it, the card remains but its recipe details will no longer appear. This cannot be undone.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="messages" className="mt-10 scroll-mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">4. Reading &amp; Deleting Messages</h2>
          <div className="mt-4 space-y-3 text-ink-600">
            <p>
              The <strong>Messages</strong> tab shows messages submitted through the public contact form.
              A badge with the total count appears on the tab label.
            </p>

            <MockFrame label="The Messages tab with a message">
              <div>
                <MockBar />
                <div className="space-y-2 px-4 py-3">
                  <div className="flex gap-2">
                    <span className="rounded-full bg-cream-100 px-4 py-1.5 text-xs text-ink-500">creations</span>
                    <span className="rounded-full bg-cream-100 px-4 py-1.5 text-xs text-ink-500">recipes</span>
                    <span className="rounded-full bg-cream-700 px-4 py-1.5 text-xs font-medium text-cream-50">
                      messages <span className="ml-1 rounded-full bg-wine-500 px-1.5 text-[9px] text-cream-50">2</span>
                    </span>
                  </div>
                  <div className="rounded-lg border border-cream-200 p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold text-ink-700">Jane Doe</p>
                        <p className="text-[10px] text-cream-600">jane@email.com</p>
                        <span className="mt-1 inline-block rounded-full bg-cream-100 px-2 py-0.5 text-[9px] text-ink-500">Custom Order</span>
                      </div>
                      <span className="text-[10px] text-wine-600 underline">Delete</span>
                    </div>
                    <p className="mt-2 text-xs text-ink-600">Hi! I'd love to order a personalized candle for my wedding...</p>
                    <p className="mt-1 text-[9px] text-ink-300">9/2/2026, 2:30 PM</p>
                  </div>
                </div>
              </div>
            </MockFrame>

            <ul className="list-disc space-y-1 pl-6 text-sm">
              <li>Each message shows the sender's name, email, topic, message text, and submission date.</li>
              <li>To reply, copy the email address and reply from your own email app.</li>
              <li>To remove a message, click <strong>Delete</strong>. This cannot be undone.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section id="images" className="mt-10 scroll-mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">5. Uploading Images</h2>
          <div className="mt-4 space-y-3 text-ink-600">
            <p>
              Images are stored in a secure storage bucket and displayed on the public site. Here's how to
              manage them well:
            </p>

            <MockFrame label="Image upload area">
              <div className="p-4">
                <p className="mb-2 text-xs font-medium text-ink-600">Image</p>
                <div className="flex items-center gap-3">
                  <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-cream-200 to-cream-300" />
                  <div className="flex gap-2">
                    <span className="rounded-full bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-600">Replace</span>
                    <span className="rounded-full bg-wine-50 px-3 py-1.5 text-xs font-medium text-wine-600">Remove</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center rounded-lg border-2 border-dashed border-cream-300 bg-cream-50 py-6 text-xs text-cream-400">
                  Click to upload image
                </div>
              </div>
            </MockFrame>

            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li><strong>Format:</strong> JPG, PNG, or WebP. Avoid very large files (keep under 2&nbsp;MB) for fast loading.</li>
              <li><strong>Aspect ratio:</strong> Landscape or square images work best for gallery cards. Portrait photos will be cropped to fit.</li>
              <li><strong>Replacing:</strong> When you edit a creation or recipe and upload a new image, the old image is automatically deleted from storage — no manual cleanup needed.</li>
              <li><strong>Removing:</strong> Click <strong>Remove</strong> in the image area to clear the current image. Save the form to confirm. The creation or recipe will appear without an image (a placeholder icon shows instead).</li>
              <li><strong>Preview:</strong> After selecting a file, a small preview appears so you can confirm the image looks right before saving.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section id="tips" className="mt-10 scroll-mt-20">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">6. Tips &amp; Shortcuts</h2>
          <div className="mt-4 space-y-3 text-ink-600">
            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li><strong>Auto sign-in:</strong> Click <strong>Admin view</strong> at the bottom of any page and you'll be signed in automatically — no typing needed.</li>
              <li><strong>Quick sign-in:</strong> If auto sign-in doesn't work, type <kbd className="rounded bg-cream-200 px-2 py-0.5 font-mono text-xs">T</kbd> in the email field to auto-fill credentials, then press Sign In.</li>
              <li><strong>Feature strategically:</strong> Only 4 featured creations show on the homepage at once. Feature your best work and un-feature older items to keep the homepage fresh.</li>
              <li><strong>Hide instead of delete:</strong> If you're not sure you want to remove something permanently, use the Hide toggle instead. Hidden items can be shown again any time.</li>
              <li><strong>Recipe + creation link:</strong> When you add a recipe from the Recipes tab, a gallery card is created automatically. When you add a creation with category "Recipe", you can fill in recipe details in the same form — both save together.</li>
              <li><strong>Real-time updates:</strong> The public homepage and gallery update automatically when you make changes — no need to refresh or republish.</li>
            </ul>
          </div>
        </section>

        <div className="mt-12 border-t border-cream-200 pt-6 text-center text-sm text-ink-400">
          Need help? Contact your site administrator.
        </div>
      </div>
    </div>
  )
}
