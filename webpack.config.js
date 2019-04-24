
var path = require('path');

const serverConfig = {
    entry: './src/index.ts',
    target: 'node',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            { test: /.ts$/, loader: 'ts-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
    }
    //…
};

const clientConfig = {
    entry: './src/index.ts',
    target: 'web', // <=== can be omitted as default is 'web'
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            { test: /.ts$/, loader: 'ts-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.js',
        libraryTarget: "umd", // exposes and know when to use module.exports or exports.,
        globalObject: 'this' //!!!This line
    }
    //…
};

module.exports = [serverConfig, clientConfig];