import React, { useState, useRef } from 'react';

const ResponseCheckHooks = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  // state가 바뀔 때는 밑에 return 부분이 다시 랜더링되지만, useRef를 사용하면 return 부분이 다시 랜더링되지 않는다.
  // 따라서 다시 랜더링하고 싶지 않은 값은 ref에 넣어서 사용하면 된다.
  // DOM 이용할 때를 제외하고는 값이 바뀌기는 하지만 화면에는 영향을 미치지 않고 싶을 때 ref를 사용해준다.
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
      // ref에 대입하는걸로는 실행이 안된다 (랜더링이 되지 않기 때문)
      // 변하는 값을 기록하는 역할을 하는 것이고, 밑에 setState를 만나면 리랜더링이 된다.
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  };

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheckHooks;
