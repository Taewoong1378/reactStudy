const React = require('react');
const { useState, useRef, useMemo } = React;
const Try = require('./Try');

// this를 사용하지 않은 함수이기 때문에 바깥으로 빼줬다
const getNumbers = () => {
    // 숫자 4개를 랜덤하게 뽑는 함수 (겹치지 않게)
    console.log('getNumbers');
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


const Baseball = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [tries, setTries] = useState([]);
    // const [answer, setAnswer] = useState(getNumbers());
    const answerNumbers = useMemo(()=> getNumbers(), []);
    const [answer, setAnswer] = useState(answerNumbers);
    const inputRef  = useRef();
    

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런!');
            setTries((prevTries)=> (
                [...prevTries, { try: value, result: '홈런!' }]
            ));
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {    // 답 틀렸으면 
            const answerArray = value.split('').map((v)=> parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                setResult(`10번 넘게 실패! 답은 ${answer.join(',')}였습니다`);
                alert('게임을 다시 시작합니다');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputRef.current.focus();
            } else {
                console.log('답은', answer.join(''));
                for(let i=0; i<4; i++){
                    if(answerArray[i] === answer[i]){
                        console.log('strike', answerArray[i], answer[i]);
                        strike++;
                    } else if (answer.includes(answerArray[i])){
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball++;
                    }
                }
                setTries((prevTries) => (
                    [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.`}]
                ));
                setValue('');
                inputRef.current.focus();
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => (
                <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
                ))}
            </ul>      
            </>
        );
    };



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
            {/* <ul>
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
                        // 코드 압축
                        // 콜백함수 map의 v를 Try.jsx로 전달해줄 방법이 없는데, 이것을 전달하는 방법이 바로 props이다.
                        <Try key={v[0] + v[1]} value={v} />
                    );
                })}
            </ul> */}

            {/* map문을 돌릴 때 가장 위에 key를 써줘야한다. 그리고 key 안에 들어가는 값은 반드시 고유한 값이여야한다 (겹치면 안됨) 그렇다고 index를 넣는 짓을 하면 안된다. 성능 최적화할 때 문제가 생기기 때문.

            근데 리액트의 반복문은 여러모로 가독성이 안 좋고 성능도 좋지 않다. 그래서 이를 해결한게 바로 props!! */}
           

module.exports = Baseball;