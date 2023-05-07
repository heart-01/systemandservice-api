"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AlbumImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Picworks && this.belongsTo(models.Picworks, { foreignKey: "picwork_id" });
    }
  }
  AlbumImages.init(
    {
      picwork_id: DataTypes.INTEGER,
      image_album: DataTypes.STRING,
      place: DataTypes.STRING,
      activity: DataTypes.STRING,
      detail: DataTypes.STRING,
    },
    {
      // setting sequelize
      sequelize,
      modelName: "AlbumImages",
      freezeTableName: true,
      underscored: true,
      underscoreAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return AlbumImages;
};
