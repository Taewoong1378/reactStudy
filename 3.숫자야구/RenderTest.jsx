import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],
        // PureComponent가 편하긴하지만 object나 array와 같은 복잡한 자료구조의 경우에는 값이 바꼈는지 안 바꼈는지 정확하게 구분하지 못할 때가 있다.
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     // 만약에 지금의 counter와 다음 상태의 counter가 다르면 랜더링해라
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    // setState로 state를 아무것도 바꿔주지 않았음에도 불구하고 계속해서 랜더링되는 문제가 발생한다. 이는 성능의 문제를 발생시킴.

    // 해결책 (2가지) : shouldComponentUpdate & PureComponent
    onClick = () => {
        this.setState({});
        const array = this.state.array;
        array.push(1);
        this.setState({
            array: array,
        });
        // 만약 위에처럼 코드를 작성하면 array가 1이 추가돼서 바꼈음에도 불구하고 PureComponent는 바뀌지 않았다고 판단하여 랜더링을 안시킨다

        // 따라서 위와 같은 문제를 해결하기 위해서는 array.push(1)과 같이 array를 만들어주는 것이 아니라 아래와 같이 해줘야한다.

        // this.setState({
        //     array: [...this.state.array, 1],
        // });
    };

    render() {
        console.log('렌더링', this.state);
        return (<div>
            <button onClick={this.onClick}>클릭</button>
        </div>)
    }
}

// 클래스 컴포넌트는 shouldComponentUpdate와 PureComponent를 통해 반복 랜더링 문제를 해결한다

// 그럼 Hooks는? (함수 컴포넌트는?) -> 아래와 같이 memo를 이용한다

// import React, { memo } from 'react';
// const Try = memo(({tryInfo})=>{
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li>
//     )
// });

// 자식들이 모두 PureComponent 혹은 memo이면 부모에도 PureCompnent 혹은 memo를 사용할 수 있다.
export default Try;