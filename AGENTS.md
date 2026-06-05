# BDSi website — agent guide

Static Jekyll site for the Behavioural Data Science incubator (BMS faculty, UT).

## Branches

| Branch       | Purpose               |
|--------------|-----------------------|
| `main`       | Dev — deploys to GitHub Pages via `development.yml` |
| `production` | Prod — deploys to `www` branch, picked up by webhost |
| `www`        | Deployed static site artifact (do not edit directly) |

## Commands

```sh
bundle install                           # install deps (run after any Gemfile change)
bundle exec jekyll serve                 # local dev at http://localhost:4000
bundle exec jekyll serve -l              # same + live-reload
bundle exec jekyll build                 # production build → _site/
bundle exec htmlproofer --only-4xx --ignore-status-codes "403,429" --assume-extension ".html" --ignore-empty-alt true --ignore-missing-alt true --checks "Links,Images" ./_site
                                         # dead-link check (CI only)
```

## Platform

- Lockfile platform: `x64-mingw-ucrt`. The `wdm` gem is pinned for Windows compatibility.

## Content conventions

- Collections with `output: true` (produce pages): `_news/`, `_blogs/`, `_events/`, `_services/`, `_communities/`, `_projects/`, `_archive/`
- Collections with `output: false` (data-only, no pages): `_partners/`, `_team/`
- Permalinks: `pretty` (no `.html` extension). `.htaccess` on the webserver appends `.html` via rewrite.
- `future: true` in `_config.yml` — events/news with future dates render locally and in CI.
- Calendar data is auto-generated (see Calendar Sync below). Hand-edit `_data/calendar.yaml` only for recurring entries the sync does not cover.

## Calendar Sync (`_utils/calendar_sync/`)

Node 20 scripts that generate `_data/*.yaml` from external sources. Runs daily via `calendar.yml` (GitHub Actions, midnight UTC). Secret calendar feed URLs are in GitHub Actions secrets. You should never have to trigger these scripts manually.

```sh
cd _utils/calendar_sync && npm install
node sync.js <ics-url> ../../_data/calendar.yaml
node ut-events-scraper.js <url> <source-name> ../../_data/<output>.yaml
```

## CI & verification

- **No test framework** — only `htmlproofer` on production builds (link/image checks).
- PRs to `main` trigger dev deploy; PRs to `production` trigger full build + link check + prod deploy.
- Markdown lint config in `.markdownlint.json` disables MD013 (line length), MD033 (inline HTML), MD037 (spaces inside emphasis).

## Ruby & Node versions

- Ruby 2.7 (CI), Bundler 4.0.12 (lockfile). Use `ruby/setup-ruby@v1` with `bundler-cache: true`.
- Node 20 for calendar sync only.
