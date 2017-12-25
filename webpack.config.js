const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

let defaults = {
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
    target: "node",
}

if (process.env.NODE_ENV === 'production') {
    // Production
    module.exports = Object.assign(defaults, {
        plugins: [
            new UglifyJSPlugin()
        ]
    })
} else {
    // Development
    module.exports = Object.assign(defaults, {
        devtool: 'eval-source-map'
    })
}
