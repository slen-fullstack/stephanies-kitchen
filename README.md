# Stephanie's Kitchen 🧈

A cozy, butter-yellow recipe site built with [Hugo](https://gohugo.io/). Recipes sit on a wooden bookshelf; click a book and it opens to the recipe, with an ingredient checklist, a serving-size scaler and a printable page.

## Add a recipe (no code)

1. Go to https://app.pagescms.org and sign in with GitHub.
2. Pick this repo and open **Recipes**, then **Add an entry**.
3. Fill in the form and save. The site updates on its own in about a minute.

The 8 starter recipes are samples. Edit or delete them anytime. When they're all yours, set `sampleRecipes = false` in `hugo.toml` to hide the "sample recipes" note.

## Where things live

| What | Where |
| --- | --- |
| Site name, tagline, shelf names | `hugo.toml` |
| Recipes | `content/recipes/*.md` (one file per recipe) |
| About page | `content/about.md` |
| Photos | `static/images/` |
| Styles | `assets/css/main.css` |
| Bookshelf and book pop-up code | `assets/js/main.js` |
| Templates | `layouts/` |

To add a new shelf, add its name to `shelves` in `hugo.toml` and to the **Shelf** options in `.pages.yml`.

## Run locally

```sh
hugo server        # preview at http://localhost:1313
```

## Publishing (GitHub Pages)

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. After that, every push to `main` publishes the site.
