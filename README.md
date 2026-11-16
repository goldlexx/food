# Food Landing Page

A responsive landing page for a healthy meal service, built with vanilla JavaScript and Webpack.

## Live page

[Open the GitHub Pages demo](https://goldlexx.github.io/food/).

The public page is a static demo. Its menu is loaded from the included `db.json` sample data; order forms clearly report that requests are not sent. Locally, the menu and forms can use the JSON Server mock API.

## Run locally

Use Node.js 18.12 or newer, then install dependencies and build the JavaScript bundle:

```sh
npm ci
npm run build
```

Start the local mock API in one terminal:

```sh
npm run server
```

Serve the repository root over HTTP in another terminal and open `index.html`. The mock API listens on `127.0.0.1:3000` and reads `db.json`. Requests created there are test data only; they do not contact a real food service.

The GitHub Pages workflow builds the JavaScript bundle from source and publishes it with the static menu data.

## Technologies

- HTML and CSS
- JavaScript with Babel
- Webpack 5
- JSON Server 0.17
