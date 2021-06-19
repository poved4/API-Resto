const jwt = require("jsonwebtoken");
const fs = require("fs");

// const ReadSignature = () => {
//     const path = "../resources/AuthenticationKey.txt";
//     const privateKey = fs.readFileSync(path, "utf8");
//     console.log(privateKey);
//     return privateKey;
// }

const ReadSignature = () => "resto.com";

function codifyToken(user) {
    return jwt.sign({
        id: user.user_id,
        rol: user.user_rol,
        user: user.user_name,
        password: user.user_password
    }, ReadSignature());
}

function decodifyToken (token) {
    const signature = ReadSignature();
    if (!token) { throw "wrongData"; }
    const cutToken = token.split(' ')[1];
    return jwt.verify(cutToken, ReadSignature());
}

module.exports = { codifyToken, decodifyToken }