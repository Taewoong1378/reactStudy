const React = require('react');
const { useState, useRef } = React;

const getNumbers = () => {
    let output = [];
    for(let i=0;i<4;i++){
        output.push(Math.ceil(Math.random()*9));
        for(let j=0; j<i; j++){
            if(output[i] === output[j]){
                output.splice(i,1);
                i--;
            }
        }
    }
    return output;
}

const Baseball = () => {

    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers());
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(value === answer.join('')) {
            // 정답을 맞췄을 때,
            setResult('홈런!');
            setAnswer(getNumbers());
            setValue('');
            setTries((prevTries) => {
                [...prevTries, { try: value, result: '홈런!' }];
            });
            inputRef.current.focus();
        } else {
            // 정답을 틀렸을 때,
            const answersArray = value.split(', ').map((v)=> parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                // 10번을 넘어서 틀렸을 때,
                alert('게임을 다시 시작합니다');
                setResult(`10번 넘게 실패! 답은 ${answer.join(',')}였습니다`);
                setAnswer(getNumbers());
                setValue('');
                setTries([]);
                inputRef.current.focus();
            } else {
                for(let i=0;i<4;i++){
                    if(answer[i]===answersArray[i]){
                        console.log('strike', answersArray[i], answer[i]);
                        strike++;
                    } else if (answer.includes(answersArray[i])){
                        console.log('ball', answersArray[i], answer.indexOf(answersArray[i]));
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.`}];
                });
                setValue('');
                inputRef.current.focus();
            }
        }
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChange}/>
                <button>입력!</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v,i)=> (
                <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
                ))}
            </ul>
        </>
    );
}

module.exports = WordRelay;