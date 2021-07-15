import React, { Component } from 'react';
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,  // 로또 한 번 뽑고 난 후 재실행
  };

  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts');
    const { winNumbers } = this.state;
    // 공 6개 뽑기
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // 보너스공 하나 빼기
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    // 보너스공 뽑기
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log('didMount');
    this.runTimeouts();
    console.log('로또 숫자를 생성합니다.');
  }

  // setState가 될 때마다 componentDidUpdate가 실행된다.
  // 따라서 만약 조건문을 넣지않고 아래와 같이 사용한다면 runTimeouts이 랜더링 될때마다 계속 실행된다.

  // componentDidUpdate(prevProps, prevState) {
  //   this.runTimeouts();
  // }
  
  // 따라서 componentDidUpdate에서는 조건문을 달아주는게 거의 필수!

  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate');
    // 로또 숫자를 다 뽑고 나서 한번더를 눌러서 winBalls의 length가 초기화 됐을 때 runTimeouts이 실행됨
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log('로또 숫자를 생성합니다.');
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    // 버튼 누르면 초기화
    console.log('onClickRedo');
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {/* redo가 false일 때는 '한 번 더' 버튼이 안 보이다가 redo가 true가 되면 한 번 더 버튼이 나타난다 */}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
