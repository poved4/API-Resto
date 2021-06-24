const router = require("express").Router();

const bcrypt = require('bcrypt');
const checker = require("../controllers/checker");
const queries = require("../controllers/queries");
const AppError = require("../controllers/appError");
const auth = require("../controllers/Authentication");

// router.get("/", async (req, res) => {
//   const users = await queries.selectAll();
//   console.log(users);
//   res.status(200).json(users);
// });

router.post("/singUp", async (req, res) => {
    try {
        checker.singUp(req.body);
        if (await queries.selectEmail(req.body.email)) throw new AppError.badRequest("registered email");
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await queries.insertNewUser(req.body);
        res.status(201).json({});
    } catch (e) { 
        const code = e.code || 500;
        const message = e.message || "Internal Server Error";
        res.status(code).json(message);
    } 
});

router.post("/singIn", async (req, res)=> {
    try {
        const {email, password} = req.body;
        checker.mailCheck(email);
        const user = await queries.selectEmail(email);
        if(!user) throw new AppError.badRequest("Unregistered user");

        if (await bcrypt.compare(password, user.user_password)) { 
            const token  = auth.generateAccessToken({
                id: user.user_id,
                rol: user.user_rol,
                user: user.user_name,
            });
            res.status(201).json({ token });
        } 
        else throw new AppError.badRequest("Wrong email or password");
    }  catch (e) { 
        const code = e.code || 500;
        const message = e.message || "Internal Server Error";
        res.status(code).json({message});
    } 
});

router.delete("/logout", async (req, res)=> {
    try {
        throw new AppError.notImplemented("Logout");
        res.code(204).json({});
    }  catch (e) { 
        const code = e.code || 500;
        const message = e.message || "Internal Server Error";
        res.status(code).json(message);
    } 
});

module.exports = router;