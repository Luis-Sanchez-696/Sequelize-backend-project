import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("serviceApp", "root", "passDB", {
  host: "localhost",
  dialect: "mysql",
});
