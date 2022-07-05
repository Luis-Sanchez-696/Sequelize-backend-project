import express from "express";
import productsRouter from "./routes/products.routes";
import categoriesRouter from "./routes/categories.routes";
import authRouter from "./routes/auth.routes";

export const app = express();

//middlewares
app.use(express.json());
app.use(productsRouter);
app.use(categoriesRouter);
app.use(authRouter);
