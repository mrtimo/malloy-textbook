# Learning Malloy: a hands-on textbook

**Read it:** https://mrtimo.github.io/malloy-textbook/
**Run the notebooks:** https://github.com/mrtimo/malloy-textbook-notebooks

A 14-chapter introduction to [Malloy](https://www.malloydata.dev/), using U.S. baby names and an
e-commerce store as running examples. This repository holds the book's source, the static-site
generator (adapted from the [Malloy documentation site](https://github.com/malloydata/malloydata.github.io)),
and the built HTML that GitHub Pages serves.

```
src/textbook/              ← THE BOOK: chapters (.malloynb), models (.malloy), data/, img/
src/table_of_contents.json ← sidebar and prev/next order
src/css/textbook.css       ← textbook theme (layered over document.css)
layouts/                   ← page templates
scripts/                   ← the generator, plus make_student_notebooks.mjs
scripts-data/              ← regenerates the fake messy CSV used in Chapter 9
textbook.config.json       ← title and the two GitHub repo names
docs/                      ← BUILT SITE, served by GitHub Pages (main branch, /docs)
```

Every Malloy cell runs against DuckDB at build time, and its results are embedded in the page. The
build fails if any query errors or any internal link is broken.

## Editing workflow

```bash
npm install
npm run build && npm run start-server     # local preview at http://localhost:4000/textbook
npm run build-pages                       # production build into docs/ (base URL /malloy-textbook)
npm run student                           # copy notebooks/models/data to ../student-notebooks
```

After editing a chapter in `src/textbook/`:

1. `npm run build-pages`, then commit and push this repo. GitHub Pages republishes `docs/`.
2. `npm run student`, then commit and push the notebooks repo (`../student-notebooks`).

## Writing conventions

* Cells: `>>>markdown` / `>>>malloy`.
* `#(docs) size=small|medium|large|xlarge limit=N` controls on-site display only (default limit 10).
* Callouts are blockquotes that start with an emoji: `> 🎯` challenge (green), `> 📘` docs link
  (blue), `> 💡` tip (yellow), `> ⚠️` warning (red). They show as plain blockquotes in VS Code.
* Internal links end in `.malloynb`. Use `<code>` for non-Malloy inline code.

Built with Malloy 0.0.437. Known Malloy issues the book works around are noted in the chapters
(see malloydata/malloy#3159, #3161, #3163, #3197, #3198, #2903).
