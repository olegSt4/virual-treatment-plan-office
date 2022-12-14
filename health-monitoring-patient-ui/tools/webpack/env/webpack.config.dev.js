const { merge } = require("webpack-merge");
const styleConfig = require("../webpack.styles");

module.exports = merge(styleConfig(), {
    mode: 'development',
    entry: ['./src/main.tsx'],
    module: {
        rules: require('../webpack.rules'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: require('../webpack.plugins'),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
        alias: require('../webpack.aliases'),
    },
    stats: 'errors-warnings',
    devtool: 'cheap-module-source-map',
    devServer: {
        open: true,
        port: 8001,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false,
    }
});