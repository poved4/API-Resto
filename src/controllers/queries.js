const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://user:password@host:port/database');
const sequelize = new Sequelize('mysql://root:My$QL;@localhost:3306/resto');

const appError = require("../controllers/appError");

//USER
exports.selectAll = async () => {
    const query = `SELECT * FROM resto.users;`;
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    if (data.length === 0) throw new appError.noContent("No data");
    return data;
}

exports.selectEmail = async (email) => {
    const query = `SELECT * FROM resto.users WHERE user_email = "${email}";`;
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return data.length === 0? false : data[0];
}

exports.insertNewUser = async ({user, fullName, email, phone, address, password}) => {
    const query = `INSERT INTO resto.users VALUES
    (null, 0, '${user}', '${fullName}', '${email}', '${phone}', '${address}', '${password}')`;
    await sequelize.query(query); 
}

//PRODUCTS
exports.selectProducts = async () => {
    const query = `SELECT * FROM resto.products;`;
    return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
}

exports.selectProductID = async (id) => {
    const query = `SELECT * FROM resto.products WHERE products_id = ${id};`;
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return data.length === 0? false : data[0];
}

exports.insertNewProduct = async({price, name, link_img}) => {
    const query = `INSERT INTO resto.products VALUES (Null, '${price}', '${name}', '${link_img}')`;
    return await sequelize.query(query); 
}

exports.updateProductId = async({price, id}) => {
    const query = `UPDATE resto.products SET products_Price = '${price}' WHERE products_id = ${id};`;
    return await sequelize.query(query); 
}

exports.deleteProductId = async(id) => {
    const query = `DELETE FROM resto.products WHERE products_id = ${id};`;
    return await sequelize.query(query); 
}

//ORDERS
exports.selectOrders = async() => {
    const query = `SELECT * FROM orders;`;
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    if (data.length === 0) throw new appError.noContent("No orders");
    return data;
}

exports.selectUserOrders = async(userId) => {
    const query = `SELECT * FROM orders WHERE fk_user_id = ${userId};`;
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    if (data.length === 0) throw new appError.noContent("No orders");
    return data;
}

exports.insertNewOrder = async({userID, date, price, wayToPay, description}) => {
    const query = `INSERT INTO resto.orders VALUES (Null, '${userID}', 'nuevo', '${date}', '${price}', '${wayToPay}', '${description}');`;
    return await sequelize.query(query); 
}

exports.updateOrderState = async({state, id}) => {
    const query = `UPDATE resto.orders SET order_state = '${state}' WHERE order_id = ${id};`;
    return await sequelize.query(query); 
}