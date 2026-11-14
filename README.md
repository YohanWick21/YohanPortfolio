# Yohan Wickramasinghe, portfolio

Static site. No build step needed to deploy: the generated HTML is committed.

## Deploy as a second Netlify site
1. Netlify > Add new site > Import from GitHub > pick this repo.
2. Build command: leave empty. Publish directory: `/` (repo root).
3. Contact form uses Netlify Forms (form name `brief`). Turn on form notifications under Site settings > Forms.

## Editing
- Copy for pages and the homepage machine lives in `tools/build.py` (JOBS list = the 8 queue jobs, marked DRAFT).
- Regenerate: `python3 tools/build.py` (needs Pillow), then commit.
- Styles: `css/site.css`. Machine engine: `js/machine.js`. Menu, filters, lightbox: `js/site.js`.
