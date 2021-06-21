const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode : 'development',
    output : {
        publicPath: 'http://localhost:8082/'
    },
    devServer : {
        port : 8082,
        historyApiFallback : true,
        index : 'index.html'
    },
    plugins : [
        new ModuleFederationPlugin({
            name: 'auth_app',
            filename : 'remoteEntry.js',
            exposes : {
                './AuthApp' : './src/bootstrap' 
            },
            shared : packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig)