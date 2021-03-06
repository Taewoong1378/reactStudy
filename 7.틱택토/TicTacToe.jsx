import React, { useEffect, useReducer, useCallback }from 'react';
import Table from './Table';

// useReducer를 배우면 react에서 redux와 비슷한 효과를 낼 수 있다.
// 그럼 useReducer와 context API까지 배우면 redux를 대체할 수 있는거 아니냐? -> 그렇지 않다. 소규모 앱에서는 redux가 필요 없어질지도 모르지만 규모가 큰 앱에서는 결국 redux를 써야한다. 비동기 부분 처리를 위해 redux가 필요하다.

// table 안에 tr(row), tr 안에 td(table의 셀들)가 있다.
// 따라서 컴포넌트를 잘게 나누자.
// table 컴포넌트, tr 컴포넌트, td 컴포넌트

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '' , ''],
              ['', '' , ''],
              ['', '' , ''],
            ],
            recentCell: [-1, -1],
            // 처음에는 아무것도 안 눌렀으니깐 없는 칸으로 만들어놨다가 앞으로 클릭하게 되면 recentCell의 값이 바뀌게 될 것이다.
}

// 모듈로 만들어주기
// Td에서도 쓸거니깐
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  // reduce 안에서 state를 어떻게 바꿀지를 적어준다.
  switch(action.type) {
    case SET_WINNER:
      // state.wiiner = action.winner 이런 식으로 하면 안된다.
      return {
        ...state, // 기존 state 얕은 복사
        winner: action.winner,
      };
    case CLICK_CELL: {
        // 기존의 tableData 값을 얕은 복사를 해준다.
        // react는 state를 바꿀 때 반드시 불변성을 지켜줘야된다.
        // const a = { b: 1, c: 2}일 때, const b = a; a === b;를 하면 결과가 true가 출력되지만 const c = { ...a }를 통해 얕은 복사를 하면 a === c;를 했을 때 false가 출력된다. 이런 것을 불변성을 지켜준다고 한다.
        const tableData = [...state.tableData];
        tableData[action.row] = [...tableData[action.row]]; 
        // immer라는 라이브러리로 가독성을 해결할 수 있다.
        tableData[action.row][action.cell] = state.turn;
        return {
          ...state,
          tableData,
          recentCell: [action.row, action.cell],
        };
      }
      case CHANGE_TURN: {
        return {
          ...state,
          turn: state.turn === 'O' ? 'X' : 'O',
        };
      }
      case RESET_GAME: {
        return {
          ...state,
          turn: 'O',
          tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          recentCell: [-1, -1],
        };
      }
      default:
        return state;
  }
};


const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableDate, setTableDate] = useState([['', '' , ''],['', '' , ''],['', '' , '']]);

  // 현재 구조 : TicTacToe -> Table -> Tr -> Td 
  // 우리가 실제로 클릭하는 것 : Td들
  // state는 가장 부모인 TicTacToe에서 관리하게 되는데, 실제로 클릭하는 것은 Td로 둘 간의 간격이 매우 크다.

  // dispatch 안에 들어있는 { }가 action 객체가 되는 것이고, Table을 클릭하면 dispatch를 실행한다는 것. action만 있다고 자동으로 state가 바뀌는 것은 아니고 이 action을 해석해서 state를 바꿔주는 역할을 하는 것이 바로 reducer이다. action을 dispatch할 때마다 reducer 부분이 실행된다. 
  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      // 처음에는 승자를 판별하면 안되기 때문에 이렇게 걸러줬다.
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]); // 클릭한 셀이 바뀔 때마다 검사

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;