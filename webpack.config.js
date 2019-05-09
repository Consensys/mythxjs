
// var path = require('path');

// const serverConfig = {
//     entry: './src/index.ts',
//     target: 'node',
//     resolve: {
//         extensions: ['.webpack.js', '.web.js', '.ts', '.js']
//     },
//     module: {
//         rules: [
//             { test: /.ts$/, loader: 'ts-loader' }
//         ]
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'index.js',
//         libraryTarget: "umd", // exposes and know when to use module.exports or exports.,
//     }
// };

// const clientConfig = {
//     entry: './src/index.browser.ts',
//     target: 'web',
//     resolve: {
//         extensions: ['.webpack.js', '.web.js', '.ts', '.js']
//     },
//     module: {
//         rules: [
//             { test: /.ts$/, loader: 'ts-loader' }
//         ]
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'index.browser.js',
//         libraryTarget: "umd", // exposes and know when to use module.exports or exports.,
//     }
// };

// module.exports = [serverConfig, clientConfig];
