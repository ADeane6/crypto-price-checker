const path = require( 'path' );

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],
  },

  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'bundle.js',
  },

  resolve: {
    modules: [path.resolve( __dirname, 'src' ), 'node_modules'],
    extensions: ['.js', '.json', '.jsx'],
  },

  plugins: [],

  externals: {},

  target: 'electron-renderer',
};
