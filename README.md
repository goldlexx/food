# Food Landing Page

A responsive landing page for a healthy meal service, built with vanilla JavaScript and Webpack.

## Live page

[Open the GitHub Pages demo](https://goldlexx.github.io/food/).

The page is static on GitHub Pages. Menu and request API calls use a local JSON Server and are available when running the project locally.

## Run locally

Use Node.js 18.12 or newer, then install dependencies and build the JavaScript bundle:

```sh
npm install
npm run build
```

Start the local API in one terminal:

```sh
npm run server
```

Serve the repository root over HTTP in another terminal and open `index.html`. The mock API listens on `127.0.0.1:3000` and reads `db.json`.

## Technologies

- HTML and CSS
- JavaScript with Babel
- Webpack 5
- JSON Server 0.17
