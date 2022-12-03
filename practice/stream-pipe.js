const fs = require('fs');

const readStream = fs.createReadStream('file1');
const writeStream = fs.createWriteStream('file2');
const piping = readStream.pipe(writeStream);    // file1 이 file2 로 복사됨!




const zlib = require('zlib');

const readStream = fs.createReadStream('file1');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('file2.zip');
const piping = readStream.pipe(zlibStream).pipe(writeStream);
//! ㄴ> 압축 후 전달!
