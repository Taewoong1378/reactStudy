import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ballmemo';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // lottoNumbers 없이 그냥 const [winNumbers, setWinNumbers] = useState(getWinNumbers()); 로 표현하게 되면 getNumbers() 함수가 계속해서 실행되는 문제가 발생한다. 
  // 만약 getNumbers() 함수가 10초씩 걸리는 함수라고 가정하면 문제는 매우 커진다. 
  // useMemo를 통해 getWinNumbers의 return 값을 기억할 수 있게 해준다. (함수의 결괏값 기억)
  // useMemo의 경우, 두 번째 인자가 바뀌기 전까지 다시 랜더링 되지 않는다 (기억만 함)
  // useMemo와 useRef의 차이점은 useMemo는 복잡한 함수 결괏값을 기억하는 반면, useRef는 일반값을 기억한다는 점이다.
  // Hooks에서 생성한 함수 안에는 다 console을 찍어서 해당 함수가 반복해서 실행되는지 아닌지 보도록 하자. 
  // useCallback과 useMemo의 차이점 : useCallback은 함수 자체를 기억하고, useMemo는 함수의 return 값을 기억한다.
  
  // Hooks는 실행순서가 매우 중요하다.
  // Hooks를 조건문 안에 절대 넣으면 안되고 함수나 반복문 안에도 웬만하면 넣지 말자
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // 만약 componentDidMount가 아니라 componentDidUpdate만 실행하고 싶다면 아래와 같은 패턴이 존재한다.

  // const mounted = useRef(false);
  // useEffect(()=> {
  //   if(!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     // ajax
  //   }
  // }, [바뀌는값]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
      // 얘는 timeouts.current가 바뀌는게 아니다.
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    // componentWillUnMount 부분
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); 
  // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate를 둘 다 수행
  // timeouts.current는 onClickRedo 즉, 한번 더 버튼을 바뀔 때 update 된다. 따라서 이전 componentDidUpdate에서 정의했던 것과 동일한 결과를 가리킨다. 
  // 클래스의 componentDidMount, componentDidUpdate 등과 완벽하게 일치하기는 힘들다.

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  // useCallback 적용
  // useCallback으로 감쌀 때의 장점 : 함수 자체를 기억하기 때문에 Hooks에서 전체가 리랜더링될 때, 함수를 재생성하지 않는다. 함수 생성 자체가 오래 걸릴 때는 useCallback을 이용해서 기억해둔다.

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    // 만약 뒤에 배열을 비어둘 경우, winNumbers가 새로 뽑히더라도 업데이트 되지 않고 기존의 것만을 계속해서 기억하는 현상이 발생한다.
    
    // 따라서 useCallback 안에서 사용되는 state는 뒤에 배열에 넣어주어야한다. 뒤에 배열이 들어간 인수가 바뀌면 재실행된다. 

    // 자식 컴포넌트에 함수를 넘길 때는 useCallback을 반드시 넣어줘야한다.
    //  line을 보면 Ball 자식 컴포넌트에 onClickRedo 함수를 넘겨주고 있다.
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
    // 얘는 timeouts.current가 바뀌는거다.
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
