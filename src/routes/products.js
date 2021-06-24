const router = require("express").Router();

const queries = require("../controllers/queries");
const checker = require("../controllers/checker");
const appError = require("../controllers/appError");

router.get("/", async (req, res) => {
  try {
    const products = await queries.selectProducts();
    if (!products) throw new appError.noContent();
    res.status(200).json(products);
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await queries.selectProductID(req.params.id);
    if (!product) throw new appError.noContent();
    res.status(200).json(product);
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.user.rol != 1) throw new appError.unauthorized();
    checker.newProduct(req.body);
    await queries.insertNewProduct(req.body); 
    res.status(200).json({});
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.patch("/", async (req, res) => {
  try {
    if (req.user.rol != 1) throw new appError.unauthorized();
    checker.numberCheck(req.body.price);
    await queries.updateProductId(req.body);
    res.status(200).json({});
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.user.rol != 1) throw new appError.unauthorized();
    await queries.deleteProductId(req.params.id);
    res.status(200).json({});
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

module.exports = router;