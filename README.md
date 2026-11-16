# Green Table Demo

A responsive food-planning interface built with vanilla JavaScript, HTML, CSS, and Webpack. The project demonstrates menu cards, accessible tabs, a nutrition estimate calculator, an image carousel, and a form state.

## Live demo

[Open the GitHub Pages demo](https://goldlexx.github.io/food/)

This is a static portfolio demo, not a food ordering service. Menu content is sample data in `db.json`; no prices, real availability, customer reviews, or public order processing are provided. The form reports that submissions are disabled on the public site. For local UI practice only, JSON Server can store test entries on the developer's machine.

## Run locally

Requires Node.js 18.12 or newer.

```sh
npm ci
npm run build
npm run server
```

Serve the repository root over HTTP and open `index.html`. The optional mock API listens on `127.0.0.1:3000` and uses `db.json`. Its entries are local test data only.

## Technologies

- HTML and responsive CSS
- Vanilla JavaScript with Babel
- Webpack 5
- JSON Server for local-only form practice
