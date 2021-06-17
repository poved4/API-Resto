const router = require("express").Router();
const q = require("../src/queries");
const lib = require("../src/MyLib");

router.get("/mis-pedidos", async (req, res) => {
  try {
    const orders = await q.MyOrders(req.headers.authorization);
    if (orders.length === 0) {
      res.status(204);
      res.json(orders);
    } else {
      res.status(200);
      res.json(orders);
    }
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
});

router.post("/pedidos", async (req, res) => {
  try {
    const bill = await q.NewOrder(req);
    res.status(201);
    res.json(bill);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.get("/pedidos/", lib.UserAuthentify, async (req, res) => {
  try {
    const orders = await q.Orders();
    if (orders.length === 0) {
      res.status(204);
      res.json(orders);
    } else {
      res.status(200);
      res.json(orders);
    }
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
});

router.patch("/pedidos", lib.UserAuthentify, async (req, res) => {
  try {
    const order = await q.UpdateOrderState(req.body);
    res.status(200);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.delete("/pedidos/:id", lib.UserAuthentify, async (req, res) => {
  try {
    await q.DelecteOrder(req.params.id);
    res.status(204);
    res.json({});
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

module.exports = router;