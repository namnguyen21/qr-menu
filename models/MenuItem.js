// const Sequelize = require("sequelize");

// module.exports = sequelize.define("User", {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   category: Sequelize.STRING,
//   description: Sequelize.STRING,
//   userId: Sequelize.INTEGER(11),
//   imageUrl: Sequelize.STRING,
// });

module.exports = function (sequelize, DataTypes) {
  let MenuItems = sequelize.define("menuItems", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER(11),
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  });

  MenuItems.associate = function (models) {
    MenuItems.belongsTo(models.users, {
      foreignKey: "userId",
      timestamps: false,
    });
  };

  return MenuItems;
};
