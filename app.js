const path = require("path");
const express = require("express");
const app = express();

const routers = require(path.join(__dirname, "/src/routes/routers"));

//______________________________SETTINGS
//app.set("view-engine", "ejs");
//app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

//______________________________ROUTES && MIDDELWARES
app.use(express.json());
app.use("/www.resto.com/", routers);

//______________________________LISTENER SERVER
const port = app.get("port");
app.listen(port, console.log(`http://localhost:${port}`));