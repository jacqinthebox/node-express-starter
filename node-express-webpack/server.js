const path = require("path");
const express = require("express");


const DIST_DIR = path.join(__dirname, "dist"),
  PORT = 3000,
  app = express();

if (process.env.NODE_ENV === 'dev') {
  console.log('we are in dev!');

  const webpack = require("webpack");
  const config = require("./webpack.config.dev.js");
  const compiler = webpack(config);

  const middleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
  );

  const hotMiddlware = require("webpack-hot-middleware")(compiler);
  app.use(middleware);
  app.use(hotMiddlware);
}

app.use(express.static(DIST_DIR));

app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, () => console.log("Listening to " + PORT));