const React = require('react');
const { useState, useRef } = React;

const Baseball = () => {

    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef  = useRef();

    const onSubmitForm = (e) => {
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

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요 :  </label>
                <input className="wordInput" ref={inputRef} type="text" value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    )

}

module.exports = Baseball;