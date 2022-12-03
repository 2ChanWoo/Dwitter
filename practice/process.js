for(let i=0; i<1000; i++) {
    console.log('looping');
}
setTimeout(() => {
    console.log('setTimeout');
});
process.nextTick(() => {    //태스크큐 가장 앞에다 삽입!
    console.log('nextTick');
});