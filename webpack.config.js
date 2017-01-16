const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.html' }
        ])
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            babelrc: false,
            query: {
                presets: ['es2015']
            }
        }]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    }
};
