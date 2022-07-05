import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";
import { Categories } from "./Categories";
import { Products } from "./Products";

export const Products_Categories = sequelize.define("Products_Categories", {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: "id",
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Categories,
      key: "id",
    },
  },
});

Products.belongsToMany(Categories, {
  through: "Products_Categories",
  foreignKey: "productId",
  sourceKey: "id",
});

Categories.belongsToMany(Products, {
  through: "Products_Categories",
  foreignKey: "categoryId",
  sourceKey: "id",
});
