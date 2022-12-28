
var users = [
    {
        "username": "ellie",
        "password": "12345",
        "name": "ellie",
        "email": "ellie@gmail.com",
        "url": ""
    }
]


export async function signup(req, res) {
    // 아이디 비번 이름 이멜 유알엘 받아오고
    const {username, password, name, email, url} = req.body;
    const user = {
        username,
        password,
        name,
        email,
        url,
    };
    users = [user, ...users];
    res.status(201).json(user);
    // data -> 디비에 정보 기입.
    // 이것도 토큰 응답으로 보내주고.
}

export async function login(req, res) { 앜ㅋ 비밀번호 검증을 안함 ㅁㅈ
// 아이디 비번 받아오고
const username = req.body.username;
const user = users.find((e) => e.username === username);
res.status(200).json(user);
// 해당 아이디 찾고 비번 매칭해서 맞으면 보내긔. <- 이건 데이터? 아님 컨트롤러?
// 응답으로는 토큰 보내주면 되지.
}

export async function me(req, res) {
    // 머하는놈인지 
}