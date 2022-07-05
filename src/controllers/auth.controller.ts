import { RequestHandler } from "express";
import { Clients } from "../models/Clients";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Login
export const signIn: RequestHandler = async (request, response) => {
  try {
    const { email, password } = request.body;

    await Clients.findOne({
      where: {
        email,
      },
    }).then((client) => {
      if (!client) {
        response.status(404).json({ msg: "User not founded" });
      } else {
        if (bcrypt.compareSync(password, client.getDataValue("password"))) {
          let token = jwt.sign({ user: client }, "secret", {
            expiresIn: "24h",
          });

          response.json({
            user: client,
            token: token,
          });
        } else {
          response.status(401).json({ msg: "Unauthorizated access" });
        }
      }
    });
  } catch (error) {
    response.status(400).json({ msg: error.message });
  }
};

//Registro
export const SignUp: RequestHandler = async (request, response) => {
  try {
    const { name, age, email, password } = request.body;

    //Se encripta la contraseña
    let cryptedPassword = bcrypt.hashSync(password, 10);

    await Clients.create({
      name,
      age,
      email,
      password: cryptedPassword,
    }).then((client) => {
      let token = jwt.sign({ user: client }, "secret", {
        expiresIn: "24h",
      });

      response.json({
        user: client,
        token: token,
      });
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
    response.send("Error");
  }
};
