# Stephanie's Kitchen 🧈

A cozy, butter-yellow recipe site built with [Hugo](https://gohugo.io/). Recipes sit on a wooden bookshelf; click a book and it opens to the recipe, with an ingredient checklist, a serving-size scaler and a printable page.

## Add a recipe (no code)

**On your own site:** open https://slen-fullstack.github.io/stephanies-kitchen/admin/ (there's also a "✎ Add a recipe" link in the footer). Click **Sign In Using Access Token**, paste your GitHub token, then go to **Recipes → New Recipe**. Works on phone and laptop. Saved recipes appear on the shelf in about a minute.

Making the token (once, free): GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token. Pick **Only select repositories → stephanies-kitchen**, and under Repository permissions set **Contents: Read and write**. Copy the token and keep it somewhere private.

**Or** use https://app.pagescms.org (sign in with GitHub, pick this repo, open **Recipes**).

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
| Recipe editor (at /admin) | `static/admin/config.yml` |

To add a new shelf, add its name to `shelves` in `hugo.toml` and to the **Shelf** options in `.pages.yml`.

## Run locally

```sh
hugo server        # preview at http://localhost:1313
```

## Publishing (GitHub Pages)

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. After that, every push to `main` publishes the site.
