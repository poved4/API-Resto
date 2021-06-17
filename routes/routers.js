const path = require("path");
const router = require("express").Router();
const users = require(path.join(__dirname, "users"));
const orders = require(path.join(__dirname, "orders"));

router.get('/url', (req, res) => {
  res.status(200);
  res.json({greating: "Hello world!"});
});

router.use("/users", users);
router.use("/orders", orders);

module.exports = router;