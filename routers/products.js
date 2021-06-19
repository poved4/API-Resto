const router = require("express").Router();
const q = require("../src/queries");
const lib = require("../src/MyLib");

router.get("/productos", async (req, res) => {
  try {
    items = await q.GetProducts();
    if (items.length === 0) {
      res.status(204);
      res.json(items);
    } else {
      res.status(200);
      res.json(items);
    }
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
});

router.get("/productos/:id", async (req, res) => {
  try {
    const items = await q.GetProductsByID(req.params.id);
    res.status(200);
    res.json(items);
  } catch (error) {
    res.status(404);
    res.json({ error });
  }
});

router.post("/productos", lib.UserAuthentify, async (req, res) => {
  try {
    let product = await q.CreatedProduct(req.body);
    res.status(201);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.patch("/productos/:id", lib.UserAuthentify, async (req, res) => {
  try {
    await q.UpdateProduct(req.body.price, req.params.id);
    res.status(200);
    res.json({});
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.delete("/productos/:id", lib.UserAuthentify, async (req, res) => {
  try {
    await q.DeleteProduct(req.params.id);
    res.status(204);
    res.json({});
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

module.exports = router;