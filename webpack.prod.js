const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',

    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        }
    }
});