import React, { Component } from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// (setState/props 바뀔때) -> shouldComponentUpdate(true인 경우) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

// v[0] = 바위, 가위, 보
// v[1] == 0, -142px, -284px
// imgCoord : 이미지 좌표 (0 or -142px or -284px)
// 컴퓨터가 선택한 가위, 바위, 보를 나타낸다.

// find 메서드는 callback 함수가 참을 반환 할 때까지 해당 배열의 각 요소에 대해서 callback 함수를 실행합니다. 만약 어느 요소를 찾았다면 find 메서드는 해당 요소의 값을 즉시 반환하고, 그렇지 않았다면 undefined 를 반환합니다.

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후(= render가 처음 시행된 후), 이 함수 내부의 비동기 요청을 많이 한다. 리랜더링이 될 때는 다시 실행되지 않는다. 

  // setInterval은 컴포넌트가 삭제가 되더라도 계속해서 실행된다. 따라서 componentWillunmout에서 이 비동기 요청을 정리해줘야한다.
    this.interval = setInterval(this.changeHand, 100);
  }

  // componentDidUpdate() {  // 리렌더링 후에는 얘가 실행된다.

  // }

  componentWillUnmount() { // 부모가 자식 컴포넌트를 없을 때, 즉, 컴포넌트가 제거되기 직전, 이 함수 내부의 비동기 요청 정리를 많이한다.
    clearInterval(this.interval);
  }

  changeHand = () => {
    const {imgCoord} = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          {/* <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button> 이 코드의 수정법은? */}
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
