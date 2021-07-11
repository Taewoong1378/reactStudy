const path = require('path');
// 핫로딩
const RefreshWebpackPlugin  = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'baseball-setting', // 맘대로 정하면됨
    mode: 'development', // 실서비스에서는 production으로 바꿔주고 배포하면 됨
    devtool: 'eval', // 빠르게 하겠다는 것
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],  
        // client.jsx에서 WordRelay.jsx를 불러오기 때문에 client.jsx만 불러오면 된다.
        // 나중에 app: ['./client.jsx', './csas.css', './asdadaf.json'], 과 같이 여러 형식의 파일들을 app.js에 하나로 합쳐줄 수 있는데, 파일명을 일일이 쓰기 귀찮다면 위에 resolve: {}에 확장자명을 넣어주면됨. 그럼 알아서 웹팩에서 각각의 확장자명의 파일들을 찾아준다.
    },  // 입력

    module: {
        rules: [{
            test: /\.jsx?/, 
            // js와 jsx 파일에 babel-loader을 적용하겠다는 정규표현식
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'],
                            // 원하는 브라우저 버전에만 바벨을 적용할 수도 있다.
                            // 많은 브라우저를 지원할수록 속도가 그만큼 느려지기 때문
                            // 한국에서 5% 이상 지원하는 브라우저를 타겟으로 힘
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
        // 핫로딩
        new RefreshWebpackPlugin()
        // 매우 많은 종류의 플러그인이 있음
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