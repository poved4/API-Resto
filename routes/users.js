const router = require("express").Router();

router.get("/", (req, res) => {
  const resString = `Enter to ${req.path}`;
  console.log(resString);
  res.send(resString);
  res.status(204);
}); 

module.exports = router;