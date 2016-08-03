var webpack = require('webpack');

module.exports =  {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
         'webpack/hot/only-dev-server',
        './example/index.ts'
    ],
    devtool: 'eval',
    output: {
        filename: 'bundle.js' 
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint', exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};