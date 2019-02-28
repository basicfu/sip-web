const express = require('express');
const next = require('next');
const config = require('./src/config');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.BABEL_ENV !== 'prod';
const app = next({ dev });
const handle = app.getRequestHandler();

const devProxy = {
  '/api': {
    target: 'http://localhost:7100/',
    // target: 'https://api-dev.dmka.cn/',
    secure: false,
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
  },
};

app.prepare().then(() => {
  const server = express();
  // Set up the proxy.
  if (dev && devProxy) {
    const proxyMiddleware = require('http-proxy-middleware');
    Object.keys(devProxy).forEach(context => {
      server.use(proxyMiddleware(context, devProxy[context]));
    });
  }
  // Default catch-all handler to allow Next.js to handle all other routes
  // server.all('*', (req, res) => handle(req, res));
  const redirectPath = config.redirectPath;
  if (redirectPath) {
    for (const key in redirectPath) {
      const item = redirectPath[key];
      server.get(key, (req, res) => {
        return res.redirect(item);
      });
    }
  }
  const customPath = config.customPath;
  if (customPath) {
    for (const key in customPath) {
      const item = customPath[key];
      server.get(key, (req, res) => {
        return app.render(req, res, item, { id: req.params.id });
      });
    }
  }

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
