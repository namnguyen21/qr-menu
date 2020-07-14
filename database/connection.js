const Sequelize = require("sequelize");

const sequelize = new Sequelize("minutemenu", "admin", "Cool6024dn", {
  dialect: "mysql",
  host: "minute-menu.c37nlnmyaqvp.us-west-1.rds.amazonaws.com",
  port: 3306,
  dialectOptions: {
    ssl: "Amazon RDS",
  },
});

module.exports = sequelize;
global.sequelize = sequelize;
