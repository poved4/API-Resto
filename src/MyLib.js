//Autentify
const jwt = require("jsonwebtoken");
const firma = 'resto.com';

function MyDate() {
    let d = new Date();
    let day = d.getDate();
    let mounth = d.getMonth() + 1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let iDate = `${day}/${mounth}/${year}`;
    let iHour =  `${hour}:${minute}`;
    return `${iDate} ${iHour}`;
}
function DecoToken(token){
    if (token) 
    {
        const cutToken = token.split(' ')[1];
        const user  = jwt.verify(cutToken, firma);
        return user;
    } else{
        throw `---function GetRol---Token is: ${token}`;
    }
}
function CodeToken(infoUser) {
    
    const user = infoUser;

    const info = {
        id: user[0].user_id,
        rol: user[0].user_rol,
        user: user[0].user_name,
        password: user[0].user_password
    };

    const token = jwt.sign(info, firma);
    delete user[0].user_password;
    user[0].user_token = token; 
    
    return user;
}
function UserAuthentify(req, res, next){
    try {
        const pathRequest = req.path;
        if (pathRequest === '/resto.com/singUp' || pathRequest === '/resto.com/singIn') 
        { return next(); }
        
        if (req.headers.authorization) 
        {
            const token = req.headers.authorization.split(' ')[1];
            const verifyToken  = jwt.verify(token, firma);
            
            if (verifyToken.rol === 1) { next(); }
            else { res.status(401); res.json({"Error":"unauthorized"}); }
            
        } else{
            throw `User no login or headers.authorization. Not Found `;
        }
    } catch (error) { res.status(400); res.json({error}); }
}

module.exports = {
    UserAuthentify,
    DecoToken,
    CodeToken,
    MyDate
}