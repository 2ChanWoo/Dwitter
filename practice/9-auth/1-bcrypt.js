const bcrypt = require('bcrypt');

const password = 'adcd1234';
const hashed = bcrypt.hashSync(password, 16);
console.log(`password: ${password}, hashed: ${hashed}`);