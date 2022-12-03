
//log level
console.log('log');
console.info('info');
console.warn('warn');
console.error('error');

//assert
console.assert(2 === 3, 'printed');

//print object
const student = {name: 'johnson', age: 20, company: {name: 'ABC'}};
console.log(student);
console.table(student);
console.dir(student, {showHidden: true, colors: false, depth: 2});

//measuring time
console.time('for loop');
for(let i=0; i<10; i++) {i++}
console.timeEnd('for loop');

//counting
function a() {
    console.count('a function');
}
a();
console.countReset('a function');
a();

//trace
function f1() {
    f2();
}
function f2() {
    f3();
}
function f3() {
    console.log('f3');
    console.trace();
}
f1();

