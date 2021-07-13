const React = require('react');
const { memo } = require('react');
// const { Component } = require('react');

// class Try extends Component {
//     render() {

//         return (
//             <li>
//                 <div>{this.props.tryInfo.try}</div>
//                 <div>{this.props.tryInfo.result}</div>
//             </li>
//         );
//         return (
//         <li>
//             <b>{this.props.value[0]}</b> -{this.props.value[1]}
//             <div>컨텐츠</div>    
//             <div>컨텐츠1</div>    
//             <div>컨텐츠2</div>    
//             <div>컨텐츠3</div>    
//         </li>
//         )
//     }
// }

const Try = memo(({ tryInfo }) => {
    // prop를 사용할 때는 자식의 값을 임의로 바꿔줘선 안된다
    // ex. tryInfo.try = 'hello'
    // 값을 바꾸고 싶으면 부모에서 바꿔줘야함
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

module.exports = Try;