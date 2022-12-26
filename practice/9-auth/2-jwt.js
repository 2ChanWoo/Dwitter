const jwt = require('jsonwebtoken');

const secret = '&su2eXCQBEDxT$^n3Fu8qALx9eE72o*B';  // https://www.lastpass.com/features/password-generator#generatorTool
const token = jwt.sign(
    {
        id: 'chanwoo',
        isAdmin: true,
    },
    secret,
    {expiresIn: 20000000}   //유효시간
);

jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
    //{ id: 'chanwoo', isAdmin: true, iat: 1672068797, exp: 1692068797 }
    // iat ->  토큰이 언제 발행되었는지에 대한 정보.
})

console.log(token);
