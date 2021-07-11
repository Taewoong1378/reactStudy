const React = require('react');
const { useState, useRef } = React;

const Baseball = () => {

    const [strike, setStrike] = useState(0);
    const [ball, setBall] = useState(0);
    const [value, setValue] = useState('');
    const [tries, settries] = useState('');
    const [answer, setAnswer] = useState('');
    const inputRef  = useRef();

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const getNumbers = () => {
        // 숫자 4개를 랜덤하게 뽑는 함수 (겹치지 않게)
        let output = [];
        for(let i=0; i<4; i++){
            output.push(Math.ceil(Math.random() * 9));
            for(let j=0;j<i;j++){
                if(output[i]===output[j]){
                    output.splice(j,1);
                    i--;
                };
            };
        };
        return output;
    };

    return (
        <>
            <div>{strike}스트라이크 {ball}볼입니다.</div>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} type="number" value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <div>시도: {tries.length}</div>

            {/* 리액트의 반복문 사용법 */}
            {/* 아래와 같이 반복되는 태그를 만드는 법은?
            <li><b>사과</b> - 맛있다</li>
            <li><b>바나나</b> - 맛없다</li>
            <li><b>포도</b> - 시다</li>
            <li><b>귤</b> - 떫다</li>
            <li><b>감</b> - 쓰다</li>
            <li><b>배</b> - 달다</li>
            <li><b>밤</b> - 몰라</li> 
            */}

            {/* 아래와 같이 하면 된다 */}
            <ul>
                {[
                    ['사과', '맛있다'], 
                    ['바나나', '맛없다'], 
                    ['포도', '시다'], 
                    ['귤', '떫다'], 
                    ['감', '쓰다'], 
                    ['배', '달다'], 
                    ['밤', '몰라']
                ].map((v)=>{
                    return (
                        <li key={v[0] + v[1]}><b>{v[0]}</b> -{v[1]}</li>
                    );
                })}
            </ul> 

            {/* map문을 돌릴 때 가장 위에 key를 써줘야한다. 그리고 key 안에 들어가는 값은 반드시 고유한 값이여야한다 (겹치면 안됨) 그렇다고 index를 넣는 짓을 하면 안된다. 성능 최적화할 때 문제가 생기기 때문.

            근데 리액트의 반복문은 여러모로 가독성이 안 좋고 성능도 좋지 않다. 그래서 이를 해결한게 바로 props!! */}
           
        </>
    )

}

module.exports = WordRelay;