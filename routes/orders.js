const router = require("express").Router();

router.get("/", async (req, res) => {
  const url = req.path;
  res.status(200).json({ url });
});

module.exports = router;