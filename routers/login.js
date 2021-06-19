const router = require("express").Router();

const messages = require("../src/messages").msg;
const auth = require('../src/Authentication');
const checker = require("../src/checker");
const queries = require("../src/query");
const bcrypt = require('bcrypt');

// //Registro
router.post("/singUp", async (req, res) => {
  const data = await singUp(req.body);
  res.status(data.code).json(data.message);
});
const singUp = async (data) => {
  let msg = messages["wrongData"]; 
  try {
      checker.singUp(data);
      if (await queries.selectEmail(data.email)) { throw "emailRegister"; }
      data.password = await bcrypt.hash(data.password, 10);
      await queries.insertNewUser(data);
      msg = messages["created"]; 
  } catch (e) { msg = messages[e] || messages["server"]; } 
  finally { return msg; }  
}

//Inicio de Sesion
router.post("/singIn", async (req, res) => {
  const data = await singIn(req.body);
  res.status(data.code).json(data.token ? {"token" : data.token} : {"message": data.message});
});
const singIn = async (obj) => {
  let msg = messages["wrongData"];
  try {
      checker.mailCheck(obj.email);
      const user = await queries.selectEmail(obj.email);
      if(!user) throw "wrongData";
      if (await bcrypt.compare(obj.password, user.user_password)) { 
        msg = messages["ok"];
        msg.token = auth.codifyToken(user);
      } 
  } catch (e) { msg = messages[e] || messages["server"]; } 
  finally { return msg; }
}

module.exports = router;