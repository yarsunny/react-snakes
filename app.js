var Server = require('./server.js');
var port = (process.env.PORT || 8080);
var app = Server.app();

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('./webpack.dev.config.js');
  var compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

app.listen(port, function () {
  console.log('Listening at http://localhost:' + port);  
});

