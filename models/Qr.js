module.exports = function (sequelize, DataTypes) {
  let Qr = sequelize.define("qr", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER(11),
  });

  Qr.associate = function (models) {
    Qr.belongsTo(models.users, {
      foreignKey: "userId",
      onDelete: "cascade",
      as: "UserQR",
    });
  };

  return Qr;
};
