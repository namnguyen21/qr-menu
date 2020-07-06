"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("menuItems", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      category: Sequelize.STRING,
      description: Sequelize.STRING,
      imageUrl: Sequelize.STRING,
      price: Sequelize.STRING,
      userId: Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("menuItems");
  },
};
