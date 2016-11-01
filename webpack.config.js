var webpack = require('webpack');


module.exports = {
  entry: './src/index',

  output: {
    filename: './dist/spatial-navigation.min.js',
    libraryTarget: 'umd',
    library: 'spatialNavigation',
  },
  
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel', 
        exclude: /node_modules/,
      }
    ]
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
  ]
};
