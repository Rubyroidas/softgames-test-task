const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (_, {mode}) => {
    const config = {
        entry: path.resolve(__dirname, './src/index.js'),
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            conservativeCollapse: false,
                        }
                    }
                ]
            }]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    };

    if (mode === 'development') {
        Object.assign(config, {
            devtool: 'cheap-module-source-map',
            devServer: {
                port: 9000,
                host: '0.0.0.0',
                open: true,
                watchContentBase: true,
                hot: true,
                clientLogLevel: 'none',
            },
        });
    }

    return config;
};
