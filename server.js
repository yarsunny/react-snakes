var path = require('path');
var express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    const buildPath = express.static(path.join(__dirname, 'build'));

    app.use('/build', buildPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
