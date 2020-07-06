// const Sequelize = require("sequelize");

// module.exports = sequelize.define("User", {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
//   password: Sequelize.STRING,
//   restaurant: Sequelize.STRING,
// });

module.exports = function (sequelize, DataTypes) {
  let Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    restaurant: DataTypes.STRING,
  });

  Users.associate = function (models) {
    Users.hasMany(models.menuItems, {
      foreignKey: "userId",
      onDelete: "cascade",
      as: "UserMenuItems",
    });
    Users.hasOne(models.qr, {
      foreignKey: "userId",
      onDelete: "cascade",
      as: "UserQr",
    });
  };

  return Users;
};
