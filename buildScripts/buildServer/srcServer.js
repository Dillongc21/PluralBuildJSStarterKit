// require modules
import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../../webpack.config.dev';

/* eslint-disable no-console */

process.env.NODE_ENV = 'development';

// variables
const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(express.static("."));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function (req, res) {
  //hard coded for simplicity, pretend this hits a real database
  res.json([
    {"id": 1, "firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2, "firstName":"Dillon","lastName":"Christensen","email":"dillongc21@gmail.com"},
    {"id": 3, "firstName":"Jane","lastName":"Doe","email":"janeldoe@gmail.com"}
  ]);
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
