const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.BABEL_ENV !== 'prod';
const app = next({ dev });
const handle = app.getRequestHandler();

const devProxy = {
  '/api': {
    target: 'http://api-dev.dmka.cn/',
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
  //
  server.get('/a', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });
  server.get('/b', (req, res) => {
    return app.render(req, res, '/test', req.query);
  });

  // server.get('/posts/:id', (req, res) => {
  //   return app.render(req, res, '/posts', { id: req.params.id });
  // });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
