import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const auth: RequestHandler = async (request, response, next) => {
  if (!request.headers.authorization) {
    response.status(401).json({ msg: "Unauthorizated access" });
  } else {
    let token = request.headers.authorization.split(" ")[1];

    jwt.verify(token, "secret", (error) => {
      if (error) {
        response
          .status(400)
          .json({ msg: "An error has occurred: " + error.message });
      } else {
        next();
      }
    });
  }
};

export default auth;
