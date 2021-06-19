const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://user:password@host:port/database');
const sequelize = new Sequelize('mysql://root:My$QL;@localhost:3306/resto');

const select = async ({table = "resto.users", column = "user_email", value}) => {
    const query = `SELECT * FROM ${table} WHERE ${column} = "${value}" `;
    return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
}

const selectEmail = async (email) => {
    const query = `SELECT * FROM resto.users WHERE user_email = "${email}" `;
    const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    if(data.length === 0) { throw "noContent"; }
    return data[0];
}

const insertUser = async ({user, fullName, email, phone, address, password}) => {
    const query = `INSERT INTO resto.users VALUES
    (null, 0, '${user}', '${fullName}', '${email}', '${phone}', '${address}', '${password}')`;
    await sequelize.query(query); 
}

module.exports = {
    select,
    selectEmail,
    insertUser
}