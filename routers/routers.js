const path = require("path");
const router = require("express").Router();
const auth = require("../src/Authentication");
const messages = require("../src/messages").msg;

const login = require(path.join(__dirname, "login"));
const orders = require(path.join(__dirname, "orders"));
const products = require(path.join(__dirname, "products"));

//Verify Token
router.use((req, res, next) => {
  let msg = messages["Unauthorized"];

  try {
    const headerAuth = req.headers.authorization;
    if (req.path === "/singUp" || req.path === "/singIn") 
    { return next(); }
    else if (headerAuth === undefined || !auth.decodifyToken(headerAuth)) 
    { res.status(msg.code).json(msg.message); } else { return next(); }
  } catch (e) { 
    msg = messages[e];
    res.status(msg.code).json(msg.message)
  }
});

//Routers
router.use("/", login);
router.use("/orders", orders);
router.use("/products", products);

module.exports = router;