<p align="center">
  <img src="public/assets/img/logo.svg" alt="" width="96" height="96" />
</p>

<h1 align="center">Operafy</h1>

<p align="center">
  <strong>Spotify, but it only plays opera.</strong><br />
  Historic recordings by Caruso, Gigli and Ponselle, streamed from the public domain.
</p>

<p align="center">
  <a href="https://operafy-music.vercel.app"><img alt="Listen now" src="https://img.shields.io/badge/▶%20Listen%20now-operafy--music.vercel.app-a7f62e?style=for-the-badge&labelColor=141922" /></a>
</p>

<p align="center">
  <img alt="React 18" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white" />
  <img alt="React Router 7" src="https://img.shields.io/badge/React_Router-7-ca4245?logo=reactrouter&logoColor=white" />
  <img alt="Appwrite" src="https://img.shields.io/badge/Appwrite-auth_%2B_database-fd366e?logo=appwrite&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white" />
  <img alt="31 recordings from 20 operas" src="https://img.shields.io/badge/catalogue-31_recordings_·_20_operas-8c5a2f" />
</p>

<p align="center">
  <a href="#how-to-use-it">How to use it</a> ·
  <a href="#the-story">The story</a> ·
  <a href="#2026-the-javascript-update">What changed in 2026</a> ·
  <a href="#the-music-and-artwork">Music &amp; artwork</a> ·
  <a href="#running-it-locally">Run it locally</a>
</p>

<p align="center">
  <img src="docs/operafy-demo.gif" alt="Browsing operas with historic poster covers, searching for Caruso, opening La bohème, and using the player" width="900" />
</p>

---

## The story

Operafy was my first HTML and CSS project, built in 2022 as a challenge during coding bootcamp. The brief was to push CSS as far as it would go and use the right HTML tag for everything.

I picked a Spotify clone, with one twist: **it would only play opera.** I knew nothing about opera, and that was half the fun.

This is the project that got me hooked on development. It was the first one where I set my alarm hours before class just to keep building. The play buttons didn't play anything and the playlists were typed straight into the code, but it looked like the real thing, and I was proud of it.

---

## 2026: the JavaScript update

Four years later, Claude and I gave it the update it deserved. The 2022 styling was the starting point, and now everything that looked like it worked actually does. In terms of this project, I've taken it as far as I would like to go; its purpose was to learn HTML and CSS best practices, and it did that. The 2026 update just serves to revive a fun project, and remind myself of how it all started.

<table>
<tr><th align="left"></th><th align="left">2022</th><th align="left">2026</th></tr>
<tr><td><strong>Music</strong></td><td>Decorative play buttons</td><td>31 real recordings from 1896–1943 you can play</td></tr>
<tr><td><strong>Player</strong></td><td>Static icons and sliders</td><td>Play/pause, next/previous, shuffle, repeat, seek, volume, mute</td></tr>
<tr><td><strong>Playlists</strong></td><td>Hardcoded (“gym opera”, “dubstep opera mashup”)</td><td>Create, rename and delete your own, saved to your account</td></tr>
<tr><td><strong>Accounts</strong></td><td>A login button that did nothing</td><td>Sign up, log in and log out with Appwrite</td></tr>
<tr><td><strong>Pages</strong></td><td>One page</td><td>Real routes: <code>/home</code>, <code>/search</code>, <code>/playlists</code>, <code>/operas/:id</code></td></tr>
<tr><td><strong>Search</strong></td><td>None</td><td>Songs, operas, composers, singers and your playlists</td></tr>
<tr><td><strong>Artwork</strong></td><td>Copyrighted album sleeves</td><td>Public-domain posters, scores and stage designs</td></tr>
<tr><td><strong>Language</strong></td><td>Italian</td><td>English</td></tr>
<tr><td><strong>Mobile</strong></td><td>Desktop only</td><td>Bottom tab bar and a mini-player</td></tr>
<tr><td><strong>Hosting</strong></td><td>Local only</td><td>Live on Vercel</td></tr>
</table>

Along the way: buttons that aren't buttons are gone and track lists are proper tables; every page that isn't built yet says **Coming soon** instead of pretending; and the "Install app" button and the Spotify logo went in the bin.

<p align="center">
  <img src="docs/mobile-home.jpg" alt="Operafy home page on a phone" width="252" />
  &nbsp;&nbsp;&nbsp;
  <img src="docs/mobile-opera.jpg" alt="La bohème opera page on a phone, with the mini-player" width="252" />
</p>

<p align="center"><em>The same app on a phone: the sidebar becomes a tab bar, the player becomes a mini-player.</em></p>

---

## How to use it

| # | Step |
| :--: | --- |
| **1** | **Browse** — open [operafy-music.vercel.app](https://operafy-music.vercel.app). Every opera is there, from Gluck's *Orfeo ed Euridice* (1762) to Puccini's *Madama Butterfly* (1904). |
| **2** | **Play something** — hover a cover and press the green play button, or open an opera and click any track. Shuffle, repeat, seek and volume all work. |
| **3** | **Search** — try `caruso`, `puccini` or `boheme`. Accents are optional. |
| **4** | **Sign up** — listening needs no account, but playlists do. |
| **5** | **Make playlists** — **Create playlist** in the sidebar, then add tracks with the button beside any song. They're saved to your account. |

---

## The music and artwork

Everything you hear and see is in the public domain, from [Wikimedia Commons](https://commons.wikimedia.org/).

> **Recordings** — mostly 78 rpm discs digitised by the Swiss Public Domain Project: Enrico Caruso, Beniamino Gigli, Rosa Ponselle, Amelita Galli-Curci, Toti Dal Monte, and La Scala under Lorenzo Molajoli.
>
> **Covers** — original Ricordi posters by Adolfo Hohenstein and Leopoldo Metlicovitz, Karl Friedrich Schinkel's 1815 *Zauberflöte* stage design, Arthur Rackham's *Valkyrie* illustrations, and period scores and playbills.

The in-app [credits page](https://operafy-music.vercel.app/credits) links every file to its source and licence.

<details>
<summary><strong>Licensing note</strong></summary>

Commons tags these files as public domain. Recordings published before 1926 are public domain almost everywhere. Some later ones (1927–1943) are out of copyright in the UK and EU but may still be protected in the US. That's fine for a portfolio project; check before any commercial use.

</details>

---

## How it is built

| Layer | Choice |
| --- | --- |
| **Frontend** | React 18 (Create React App), React Router 7, plain CSS |
| **Backend** | Appwrite Cloud — authentication and TablesDB with owner-only row permissions, free tier |
| **Hosting** | Vercel, free tier, with SPA rewrites so deep links work |
| **Data** | Python scripts that build the catalogue and covers from the Wikimedia Commons API |

---

## Running it locally

```bash
npm install
cp .env.example .env.local   # add your Appwrite project details
npm start                    # http://localhost:3000
```

Without Appwrite details, everything except accounts and playlists still works.

| Command | What it does |
| --- | --- |
| `npm start` | Start the dev server |
| `npm test` | Run the tests |
| `npm run build` | Build for production into `build/` |

<details>
<summary><strong>Setting up Appwrite</strong></summary>

<br />

The schema lives in `appwrite.config.json`. With the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation):

```bash
npx appwrite-cli login
npx appwrite-cli push tables --all
npx appwrite-cli project create-web-platform --project-id <project-id> \
  --platform-id web --name "Web" --hostname <your-domain>
```

Set `projectId` in `appwrite.config.json` to your own project before pushing. `localhost` is allowed by default; add a web platform for each deployed hostname.

| Variable | Example |
| --- | --- |
| `REACT_APP_APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` |
| `REACT_APP_APPWRITE_PROJECT_ID` | your project ID |
| `REACT_APP_APPWRITE_DATABASE_ID` | `operafy` |
| `REACT_APP_APPWRITE_PLAYLISTS_TABLE_ID` | `playlists` |

Free Appwrite projects pause after a week without activity; resume them from the console.

</details>

<details>
<summary><strong>Deploying to Vercel</strong></summary>

<br />

`vercel.json` sends every route to `index.html`, so deep links like `/operas/la-boheme` work. Add the four `REACT_APP_APPWRITE_*` variables to the Vercel project, then:

```bash
npx vercel --prod
```

</details>

<details>
<summary><strong>Regenerating the catalogue</strong></summary>

<br />

- `python3 scripts/generate-tracks.py` rebuilds `src/data/tracks.json` from Wikimedia Commons.
- `python3 scripts/generate-covers.py` downloads and crops the covers listed in `scripts/cover-picks.json`. Needs Pillow (`pip install pillow`).

</details>

---

<p align="center">
  Built in 2022 with HTML, CSS and a lot of early mornings<br />
  Rebuilt in 2026 with React and a bit of help from Claude.
</p>
