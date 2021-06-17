const path = require("path");
const router = require("express").Router();
const users = require(path.join(__dirname, "users"));
const orders = require(path.join(__dirname, "orders"));

/*//Verify Token/Login
router.use((req, res, next) => {
  try {
    const pathRequest = req.path;
    const headerauthorization = req.headers.authorization;

    if (
      pathRequest === "/resto.com/singUp" ||
      pathRequest === "/resto.com/singIn"
    ) {
      return next();
    } else {
      const user = lib.DecoToken(headerauthorization);
      if (user) {
        next();
      } else {
        throw `user without registration`;
      }
    }
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});*/

router.get('/url', (req, res) => {
  res.status(200);
  res.json({greating: "Hello world!"});
});

router.use("/users", users);
router.use("/orders", orders);

module.exports = router;