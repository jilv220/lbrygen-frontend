const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  transpileDependencies: true,
  configureWebpack:{
    performance: {
      hints: false
    },
    plugins: [
      new NodePolyfillPlugin(), 
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
}
