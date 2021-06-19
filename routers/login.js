const router = require("express").Router();

const messages = require("../src/messages").msg;
const auth = require('../src/Authentication');
const checker = require("../src/checker");
const queries = require("../src/query");
const bcrypt = require('bcrypt');

// //Registro
router.post("/singIn", async (req, res) => {
  const data = await singIn(req.body);
  res.status(data.code).json(data.message);
});
const singIn = async (data) => {
  let msg = messages["wrongData"]; 
  try {
      checker.singIn(data);
      if (await queries.selectEmail(data.email)) { throw "emailRegister"; }
      data.password = await bcrypt.hash(data.password, 10);
      await queries.insertUser(data);
      msg = messages["created"]; 
  } catch (e) { msg = messages[e]; } 
  finally { return msg; }  
}

//Inicio de Sesion
router.post("/singUp", async (req, res) => {
  const data = await singUp(req.body);
  res.status(data.code).json(data.token ? {"token" : data.token} : {"msg": data.message});
});
const singUp = async ({email, password}) => {
  let msg = messages["wrongData"];
  try {
      checker.password({email, password});
      const data = await queries.selectEmail(email);
      if (await bcrypt.compare(password, data.user_password)) { 
        msg = messages["ok"];
        msg.token = auth.codifyToken(data);
      } 
  } catch (e) { msg = messages[e]; } 
  finally { return msg; }
}

module.exports = router;