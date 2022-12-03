const path = require('path');

///POSIX는 IEEE가 제정한 유닉스의 애플리케이션 프로그래밍 인터페이스(API) 규격
// POSIX (Unix: Mac, Linux): 'User/temp/myfile.js'
// Windows: 'C:\\temp\\myfile.js'

console.log(__dirname);
console.log(__filename);

console.log(path.sep);  // 경로 구분자 '/'
console.log(path.delimiter);    // 환경변수 구분자 ':'

// path.basename(p: string, ext?: string)
// path.extname 확장자이름

console.log(path.parse(__filename));
// {
//     root: '/',
//     dir: '/Users/[USERNAME]/dev/VSCode/dream-coding/practice',
//     base: 'path.js',
//     ext: '.js',
//     name: 'path'
//  }

// 절대경로이면 true
console.log('isAbsolute?', path.isAbsolute(__dirname));
console.log('isAbsolute?', path.isAbsolute('../'));

// 이상한 경로면 알아서 고쳐줌.
//someFolder/nextfolder
console.log(path.normalize('./someFolder//////nextfolder'));

// 운영체제 별 기호가 다른것을 알아서 맞춰줌
console.log(path.join(__dirname, 'somePath'));

