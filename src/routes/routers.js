const path = require("path");
const router = require("express").Router();
const auth = require("../controllers/Authentication");

const login = require(path.join(__dirname, "login"));
//const orders = require(path.join(__dirname, "orders"));
const products = require(path.join(__dirname, "products"));

router.use(auth.authenticateToken);//Verify Token

//Routers
router.use("/", login);
// router.use("/orders", orders);
router.use("/products", products);

module.exports = router;