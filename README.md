# Watch Studio

A React 19, Vite, GSAP, and plain CSS recreation of the daylight-to-midnight preview.

## Run

Use Node 20.19+ on the 20 line or Node 22.12+ on a newer line.

```sh
npm install
npm run dev
```

Open the local URL from Vite. Activate the watch by clicking, tapping, or pressing Enter or Space while it has focus. The face uses your device's local 24-hour time. Replay intro returns the studio to Awake.

For an existing Vite project, the files to type or replace are `src/App.jsx`, `src/WatchFace.jsx`, and `src/index.css`. Keep the import of `index.css` in `src/main.jsx` and install the animation packages with `npm install gsap @gsap/react`.

Run `npm run build` for a production build and `npm run preview` to serve it locally.
