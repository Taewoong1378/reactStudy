console.time('시작');
function getWinNumbers(){
    let output = [];
    for(let i=0;i<7;i++){
        output.push(Math.ceil(Math.random()*45));
        for(let j=0;j<i;j++){
            if(output[i] === output[j]){
                output.splice(i,1);
                i--;
            }
        }
    }
    const winNumbers = output.sort((a,b)=> { return a-b });
    const random = Math.floor(Math.random()*7);
    const bonusNumber = winNumbers[random];
    winNumbers.splice(random, 1);
    return [...winNumbers, bonusNumber];
}
console.timeEnd('시작');

const lotto = () => {
    return (
        <>
            
        </>
    );
}