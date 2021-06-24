const appError = require("./appError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '10m' });
}

exports.authenticateToken = (req, res, next) => {
    try {
        if (req.path === "/singUp" || req.path === "/singIn") 
        { next(); } else {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) throw new appError.unauthorized();
            
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) throw new appError.forbidden();
                req.user = user;
                next();
            });    
        }
    } catch (e) { 
        const code = e.code || 500;
        const message = e.message || "Internal Server Error";
        res.status(code).json({message});
    }
}