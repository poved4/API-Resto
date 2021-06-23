const router = require("express").Router();

const queries = require("../query");
const checker = require("../checker");
const auth = require("../controllers/Authentication");
const messages = require("../messages").msg;

router.get("/", async (req, res) => {
  let str = "server", data = {};
  try {
    const headerAuth = req.headers.authorization;
    const token = auth.decodifyToken(headerAuth);
    const orders = await queries.selectOrders(token.id);
    str = !orders ? "noContent" : "ok";
    data = !orders ? {} : orders;
  } catch (e) { str = e.message || "server"; }

  res.status(messages[str].code).json(data); 
});

router.post("/", async (req, res) => {
  try {
    const bill = await newOrder(req.body);
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ error });
  }
});

const newOrder = async ({wayToPay, products, hearderAuth}) => {
  console.log(`\n\n*** Hello from NewOrder`);
  let totalPrice = 0, description = '';
  const shoppingList = [];

  for (const key in products) {
      const product = products[key];
      const infoProduct = await queries.selectProductID(product.id);

      let item = {
          "name": infoProduct.products_Name,
          "price": infoProduct.products_Price,
          "quatity": product.quatity,
          "subTotal": (infoProduct.products_Price * product.quatity)
      }

      description += `${item.name}: ${item.quatity} *  ${item.price} = ${item.subTotal}\n`;
      totalPrice += item.subTotal;
      shoppingList.push(item);
  }

  //insertar order
}



router.get("/pedidos/", auth.managerAuth, async (req, res) => {
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

router.patch("/pedidos", auth.managerAuth, async (req, res) => {
  try {
    const order = await q.UpdateOrderState(req.body);
    res.status(200);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
});

router.delete("/pedidos/:id", auth.managerAuth, async (req, res) => {
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