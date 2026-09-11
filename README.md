# Operafy

A Spotify-style web player built for opera. Listen to historic recordings by Enrico Caruso, Beniamino Gigli, Rosa Ponselle and more, then sign up to build playlists that are saved to your account.

**Live demo:** [operafy-zeta.vercel.app](https://operafy-zeta.vercel.app)

This is a portfolio project, not a production service.

## Features

- **Working player**: play, pause, next and previous, shuffle, repeat (off, all or one track), seek, volume and mute. Your volume and recently played tracks are remembered.
- **Accounts**: sign up, log in and log out with [Appwrite](https://appwrite.io) authentication. Signed-out visitors can still browse and listen.
- **Playlists saved to Appwrite**: create, rename and delete playlists, and add or remove tracks. Each playlist row is readable and writable only by its owner.
- **Search** across songs, operas, composers, singers and your own playlists. Search ignores accents, so "boheme" finds *La bohème*.
- **Real routes**: `/home`, `/search`, `/playlists`, `/playlists/:id`, `/operas/:id`, `/login`, `/signup`, `/credits`, plus "coming soon" pages for podcasts, charts, genres, new releases and discover.
- **Accessible markup**: landmarks, a single `h1` per page, tables for track lists, labelled form controls and a skip link.

## The recordings

All 31 recordings are in the public domain and are streamed directly from [Wikimedia Commons](https://commons.wikimedia.org/). Most are 78 rpm discs from 1896 to 1943, digitised by the Swiss Public Domain Project. The in-app `/credits` page links to each source file.

The album covers are public-domain artwork from Commons too: original Ricordi posters by Adolfo Hohenstein and Leopoldo Metlicovitz, Karl Friedrich Schinkel's 1815 *Zauberflöte* stage design, Arthur Rackham's *Valkyrie* illustrations, period scores and playbills. Playlists without artwork fall back to a generated gradient cover.

> **Licensing note:** Commons tags these files as public domain. Recordings published before 1926 are public domain almost everywhere. Later ones (1927 to 1943) are out of copyright in the UK and EU, but may still be protected in the US. That's fine for a portfolio demo; check before any commercial use.

`scripts/generate-tracks.py` builds `src/data/tracks.json` (title, performer, year, duration, MP3 URL, source and licence) from the Commons API. Run `python3 scripts/generate-tracks.py` after editing the track list in that script.

`scripts/generate-covers.py` downloads each file listed in `scripts/cover-picks.json`, crops it to a 600×600 JPEG in `public/assets/covers/` and writes the attribution to `src/data/covers.json`. It needs Pillow (`pip install pillow`).

## Tech stack

- React 18 (Create React App)
- React Router 7
- Appwrite Cloud (Auth + TablesDB), free tier
- Vercel for hosting

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Appwrite project details
npm start
```

The app runs at <http://localhost:3000>. Without Appwrite configured, everything except accounts and playlists still works.

### Setting up Appwrite

The database schema lives in `appwrite.config.json`. With the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation):

```bash
npx appwrite-cli login
npx appwrite-cli list-organizations
npx appwrite-cli organization create-project \
  --organization-id <your-org-id> --project-id operafy-portfolio --name Operafy --region fra
npx appwrite-cli project create-web-platform --project-id operafy-portfolio \
  --platform-id localhost --name "Local development" --hostname localhost
npx appwrite-cli push tables
```

Then add a second web platform with your Vercel hostname (for example `operafy.vercel.app`) so the deployed site can call Appwrite.

| Variable | Example |
| --- | --- |
| `REACT_APP_APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` |
| `REACT_APP_APPWRITE_PROJECT_ID` | `operafy-portfolio` |
| `REACT_APP_APPWRITE_DATABASE_ID` | `operafy` |
| `REACT_APP_APPWRITE_PLAYLISTS_TABLE_ID` | `playlists` |

Note that free Appwrite Cloud projects pause after a week of inactivity. You can resume them from the Appwrite console.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the dev server |
| `npm test` | Run the tests |
| `npm run build` | Build for production into `build/` |

## Deploying to Vercel

`vercel.json` rewrites every route to `index.html`, so deep links like `/playlists/abc` work. Add the four `REACT_APP_APPWRITE_*` variables in the Vercel project settings, then deploy:

```bash
npx vercel --prod
```
