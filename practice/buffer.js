// FIxed-size chunk of memory
// array of integers, byte of data

const buf = Buffer.from('Hi');
console.log(buf);   // <Buffer 48 69>: 유니코드.
console.log(buf.length);
console.log(buf[0]);    // 72
console.log(buf[1]);    //105 아스키코드
console.log(buf.toString());
