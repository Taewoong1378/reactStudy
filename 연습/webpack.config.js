const path = require('path');
// 핫로딩 설정
const RefreshWebpackPlugin  = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'WordRelay-setting',
    mode: 'development', // 실서비스에서는 production으로
    devtool: 'eval', 
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],  
    },  // 입력

    module: {
        rules: [{
            test: /\.jsx?/, 
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'],
                            // https://github.com/browserslist/browserslist
                        }
                    }], 
                    '@babel/preset-react',
                ],
                plugins: [
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [
        // 핫로딩 설정
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },  // 출력
    // 핫로딩 설정
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
};