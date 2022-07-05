import { app } from "./app";
import { sequelize } from "./database/index";

//Importaciones de tablas para crearlas en la DB
// import "./models/Products.ts";
// import "./models/Categories.ts";
// import "./models/Clients.ts";
// import "./models/Products_Categories.ts";

const connection = async () => {
  try {
    //Probando la conexión;
    await sequelize.authenticate();
    console.log("Database is connected");

    //Creando en la base de datos la tabla Products, SI es que NO EXISTE;
    await sequelize.sync();

    app.listen(3000);
    console.log("Server is listening on port 3000");
  } catch (error) {
    console.log("Ups, error: " + error);
  }
};

connection();
