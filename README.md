# Admont AI Website

Static product website for Admont AI, intended for GitHub Pages hosting.

## Local Preview

Open `index.html` directly in a browser, or serve the repo root with any static file server.

## Generate Docs

The published documentation in `docs/` is generated with MkDocs from the sibling Markdown repo at `../admont-ai-docs`.

Expected local layout:

```text
admont-ai/
├── admont-ai-docs/
└── admont-ai-website/
```

From the website repo root, create or update the local Python environment and install the docs build dependencies:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements-docs.txt
```

Generate the static documentation site:

```sh
.venv/bin/mkdocs build --clean --strict
```

MkDocs reads source Markdown from `../admont-ai-docs` and writes the generated HTML, assets, search index, and sitemap to `docs/`. The `docs/` directory is committed so GitHub Pages can serve the documentation without running a build step.

## Deploy

Publish the repository root with GitHub Pages. No build step is required.
