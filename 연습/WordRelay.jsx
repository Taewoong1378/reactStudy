const React = require('react');
const { useState, useRef } = React;

const e = React.createElement;
const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        if(word.substr(-1)===value.substr(0,1)){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
                <label htmlFor="taewoong"></label> 글자를 입력하세요 : 
                <input ref={inputRef} value={value} onChange={onChange} type="text" id="taewoong" />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay;