const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

let defaults = {
    entry: './core/main.js',
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
        ],
        output: {
            path: path.resolve(__dirname, 'build/production'),
            filename: 'slack_mods.js'
        }
    })
} else {
    // Development
    module.exports = Object.assign(defaults, {
        devtool: 'eval-source-map',
        output: {
            path: path.resolve(__dirname, 'build/development'),
            filename: 'slack_mods.js'
        }
    })
}
