//DataBase Connection
const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://user:password@host:port/database');
const sequelize = new Sequelize('mysql://root:My$QL;@localhost:3306/resto');

const lib = require("./MyLib");

const creado = '201 Created';
const noContent = '204 No Content';
const Unauthorized = '401 Unauthorized';
const server = '500 Internal Server Error';
const wrongData = '400 Invalid data supplied';
const NotFound = '404 Not Found';

async function InfoProducts(orderId) {
    const info = [];
    const querySelect = `SELECT * FROM resto.product_order WHERE fk_order_id = ${orderId};`;
    const orders = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT} );

    for (let index = 0; index < orders.length; index++) {
        const fk_products_id = orders[index].fk_products_id;
        const querySelect = `SELECT * FROM resto.products WHERE products_id = ${fk_products_id};`;
        const product = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
        info.push(product[0]);
    }
    return info;
}
//________________________________USUARIOS____________________________________
async function SingIn({user, fullName, email, phone, address, password}) {
    if(!user || !fullName || !email || !phone || !address || !password) { throw wrongData }
    const queryInsert = `INSERT INTO resto.users VALUES (null, 0, '${user}', '${fullName}', '${email}', '${phone}', '${address}', '${password}')`;
    await sequelize.query(queryInsert); 
}
async function SingUp({email, password}) {
    if(!email || !password)  { throw wrongData; }
    const querySelect = `SELECT * FROM resto.users WHERE user_email = '${email}' AND user_password = '${password}'`;
    const user = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
    if(user.length === 0)  { throw wrongData; }
    const userInfo = lib.CodeToken(user); 
    return userInfo;
}
async function UserInfo(token) {
    const idUser = lib.DecoToken(token);
    const querySelect = `SELECT * FROM resto.users WHERE user_id = ${idUser.id};`;
    const user = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
    if(user.length === 0)  { throw server; }
    delete user[0].user_password;
    return user;
}
//______________________________CRUD PRODUCTOS________________________________
async function GetProducts() {
    const items = await sequelize.query('SELECT * FROM resto.products;', { type: sequelize.QueryTypes.SELECT });
    return items;
}
async function GetProductsByID(id) {
    const querySelect = `SELECT * FROM resto.products WHERE products_id = ${id};`;
    const items = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
    if(items.length === 0) { throw NotFound; }
    return items;
}
async function CreatedProduct({price, name, link_img}) {
    if (!price || !name || !link_img) { throw wrongData; }
    const queryInsert = `INSERT INTO resto.products VALUES (Null, '${price}', '${name}', '${link_img}')`;
    const insert = await sequelize.query(queryInsert); const id = insert[0];
    return {id, price, name, link_img};
}
async function UpdateProduct(price, id) {
    if (!price || !id) { throw wrongData; }
    const queryInsert = `UPDATE resto.products SET products_Price = '${price}' WHERE products_id = ${id};`;
    await sequelize.query(queryInsert); 
}
async function DeleteProduct(id) {
    if (!id) { throw noContent; }
    const queryInsert = `DELETE FROM resto.products WHERE products_id = ${id};`;
    await sequelize.query(queryInsert);  
}
//_________________________________PEDIDOS____________________________________
async function MyOrders(token) {
    const user = lib.DecoToken(token); 
    const querySelect = `SELECT * FROM orders WHERE fk_user_id = ${user.id};`;
    const orders = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
    
    if(orders.length !== 0) {
        for (let index = 0; index < orders.length; index++) {
            console.log(index);    
            const idOrder = orders[index].order_id;
            const infoProducts = await InfoProducts(idOrder);
            orders[index].products = infoProducts;
        }
    }
    return orders;
}
async function NewOrder(req) {
    const myDate = lib.MyDate();
    const {wayToPay, products} = req.body;
    let totalPrice = 0, generalDescription = '';
    const user = lib.DecoToken(req.headers.authorization);
    const idUser = user.id;

    for (let index = 0; index < products.length; index++) 
    {
        const {id, quatity} = products[index];
        const querySelectProduct = `SELECT products_Price, products_Name FROM resto.products WHERE products_id = ${id};`;
        const product = await sequelize.query(querySelectProduct, { type: sequelize.QueryTypes.SELECT });
        const {products_Price, products_Name} = product[0];

        totalPrice += (products_Price * quatity);
        generalDescription += ` ${quatity}x ${products_Name} $${products_Price}c/u.`;
    }    
    
    if (!idUser || !myDate || !generalDescription || !totalPrice || !wayToPay) 
    { throw wrongData; }
    else{ 
        const queryInsertOrder = `INSERT INTO resto.orders VALUES (Null, '${idUser}', 'nuevo', '${myDate}', '${totalPrice}', '${wayToPay}', '${generalDescription}');`;
        const quer = await sequelize.query(queryInsertOrder); 
        const idOrder = quer[0];

        for (let index = 0; index < products.length; index++) {
            const idProduct = products[index].id;
            const queryInsert = `INSERT INTO resto.product_order VALUES (${idOrder}, ${idProduct},${idUser});`;
            await sequelize.query(queryInsert); 
        }

        return {idOrder, idUser, myDate, generalDescription, totalPrice, wayToPay}; 
    }
}
async function Orders() {
    const querySelect = `SELECT * FROM resto.orders;`;
    const orders = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
    if(orders.length === 0) { throw noContent;}

    for (let index = 0; index < orders.length; index++) {
        const idOrder = orders[index].order_id;
        const infoProducts = await InfoProducts(idOrder);
        orders[index].products = infoProducts;
    }
    return orders;
}
async function UpdateOrderState( {id, state} ) {
    if (!id || !state) { throw wrongData; }
    const queryUpdate = `UPDATE resto.orders SET order_state = '${state}' WHERE order_id = ${id};`;
    await sequelize.query(queryUpdate);   
    const querySelect = `SELECT * FROM resto.orders WHERE order_id = ${id};`;
    const order = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });
    return order;
}
async function DelecteOrder(id) {
    if (!id) { throw 'Invalid data supplied'; }
    const queryInsert = `DELETE FROM resto.orders WHERE order_id = ${id};`;
    await sequelize.query(queryInsert); 
}

module.exports = { 
    SingIn, SingUp, UserInfo,
    GetProducts, GetProductsByID, CreatedProduct, UpdateProduct, DeleteProduct,
    MyOrders, NewOrder, Orders, UpdateOrderState, DelecteOrder
}