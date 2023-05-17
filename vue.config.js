var proxy = require('express-http-proxy')
module.exports = {
  lintOnSave: false,
  outputDir: "../src/main/resources/resources/",
  devServer: {
    port: 8000,
    before: function (app, server, compiler) {
      app.use('/api/', proxy('http://localhost:8080', {proxyReqPathResolver: req => `/api${req.url}`, limit: '15mb'}))
    }
  },
  css: {
    extract: { ignoreOrder: true },
  },
};