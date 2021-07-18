import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    // 이 액션은 메인 TicTacToe에서 처리해주면 된다.
    dispatch( {type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    dispatch({ type: CHANGE_TURN });
    console.log(rowIndex, cellIndex);
  }, []);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
};

export default Td;