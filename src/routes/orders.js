const router = require("express").Router();

const checker = require("../controllers/checker");
const queries = require("../controllers/queries");
const appError = require("../controllers/appError");

router.get("/me", async (req, res) => {
  try {
    const orders = await queries.selectUserOrders(req.user.id);
    res.status(200).json({});
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.post("/me", async (req, res) => {
  try { 
    let totalPrice = 0, description = '';
    const object = req.body.products;

    for (const key in object) {
      const product = await queries.selectProductID(object[key].id);
      const subTotal = (product.products_Price * object[key].quatity);
      description += `${object[key].quatity} ${product.products_Name}: ${subTotal} + `;
      totalPrice += subTotal;    
    }

    const d = new Date();
   
    const order = {};
    order.userID = req.user.id;
    order.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    order.price = totalPrice;
    order.wayToPay = req.body.wayToPay;
    order.description = description;

    await queries.insertNewOrder(order);
    res.status(201).json({});

  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.get("/", async (req, res) => {
  try {
    if (req.user.rol != 1) throw new appError.unauthorized();
    const orders = await queries.selectOrders();
    res.status(200).json(orders);
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

router.patch("/", async (req, res) => {
  try {
    if (req.user.rol != 1) throw new appError.unauthorized();
    const order = await queries.updateOrderState(req.body);
    res.status(304).json({});
  } catch (e) { 
    const code = e.code || 500;
    const message = e.message || "Internal Server Error";
    res.status(code).json({message});
  }
});

module.exports = router;