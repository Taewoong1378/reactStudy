const path = require('path');

module.exports = {
    name: 'gugudan', // 맘대로 정하면됨
    mode: 'development', // 실서비스에서는 production으로 바꿔주고 배포하면 됨
    devtool: 'eval', // 빠르게 하겠다는 것
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
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },
    
    output: {
        path: __dirname,
        filename: 'app.js'
    },  // 출력
};