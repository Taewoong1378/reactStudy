const React = require('react');
const { useState, useRef } = React;


const WordRelay = () => {

    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef();

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word.substr(-1) === value.substr(0,1)){
            setWord(value);
            setResult('딩동댕');
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
            <label htmlFor="taewoong">글자를 입력하세요 : </label>
            <input ref={inputRef} type="text" onChange={onChangeInput} value={value} />
            <button>입력!</button>
        </form>
        <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;