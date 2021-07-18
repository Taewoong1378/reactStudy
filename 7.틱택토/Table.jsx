import React from 'react';
import Tr from './Tr';

// tableData.length = 3
// Array(3).fill : 요소가 3개인 배열 생성
// 그 배열을 각각 Tr로 만드는 것
// 즉, 결과는 [<Tr />, <Tr />, <Tr />]
// rowIndex = 각각의 행 index
const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i)=> (
      <Tr  dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
      ))}
    </table>
  );
}

export default Table;