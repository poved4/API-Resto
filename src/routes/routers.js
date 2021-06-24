const router = require("express").Router();
const auth = require("../controllers/Authentication");

const login = require("./login");
const orders = require("./orders");
const products = require("./products");

router.use(auth.authenticateToken);//Verify Token

//Routers
router.use("/", login);
router.use("/orders", orders);
router.use("/products", products);

module.exports = router;