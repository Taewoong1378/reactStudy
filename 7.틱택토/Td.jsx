import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    // 이 액션은 메인 TicTacToe에서 처리해주면 된다.
    if(cellData) {
      return;
      // 한 번 클릭한 셀이 다시 바뀌지 않게 하는 법
    }
    // useReducer는 state가 비동기적으로 바뀐다
    dispatch( {type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    // console.log(state.turn);을 하더라도 결과가 CHANGE_TURN 되기 전 결과로 나온다. 왜냐하면 useReducer는 비동기적으로 작동하기 때문에 동기의 결과가 먼저 출력되기 때문
    console.log(rowIndex, cellIndex);
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
};

export default Td;