var webpack = require('webpack');

module.exports = {
  entry: [
    // Enable client-side library of Webpack dev server, and Webpack hot module loader
    // Provides infrastructure for hot module replacement
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',

    // Find index.js entry point
    './src/index.jsx'
  ],

  // Make sure Webpack finds .jsx files and .js files, and Babelifies both
  module: {
    loaders: [{
      test: /\.jsx?$/,  // .js(x)
      exclude: /node_modules/,
      // Configure react-hot loader in addition to Babel
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  // Build everything into dist/bundle.js
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist',  // Use dist directory as base of dev server
    hot: true  // Enable hot module replacement support
  },

  // Enable hot module replacement support
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};