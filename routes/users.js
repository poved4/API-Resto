const router = require("express").Router();
const q = require("../src/queries");

router.post("/singIn", async (req, res) => {
  try {
    await q.SingIn(req.body);
    res.status(201);
    res.json({});
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.post("/singUp", async (req, res) => {
  try {
    const userInfo = await q.SingUp(req.body);
    res.status(200);
    res.json(userInfo);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.get("/usuarios", async (req, res) => {
  try {
    const user = await q.UserInfo(req.headers.authorization);
    res.status(200);
    res.json(user);
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
});

module.exports = router;