const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './core/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    resolve: {
        modules: [
            "node_modules",
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: true,
            }
        })
    ],
    devtool: 'inline-source-map',
    target: "node",
}
