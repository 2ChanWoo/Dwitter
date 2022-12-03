function hello() {
    console.log(this);
    console.log(this === global);
}

hello();

class A{
    constructor(num) {
        this.num=num;
    }
    memberFunctiuon() {
        console.log('---- class ----');
        console.log(this);  // A { num: 1 }
        console.log(this === global);
    }
}

const a = new A(1);
a.memberFunctiuon();

console.log('---- global scope ----');
console.log(this);  // {}
console.log(this === module.exports);   //! true