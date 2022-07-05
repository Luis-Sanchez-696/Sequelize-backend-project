import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProductCategories,
  editProductCategories,
  createNewProductWithCategories,
} from "../controllers/products.controller";

//Middlewares
import auth from "../middlewares/authMittleware";

const router = Router();

router.get("/product", getProducts);

router.get("/product/:id", auth, getProduct);

router.post("/product", auth, createProduct);

router.put("/product/:id", auth, updateProduct);

router.delete("/product/:id", auth, deleteProduct);

router.get("/product-category", getProductCategories);

router.put("/product-category/:id", auth, editProductCategories);

router.post("/product-category", auth, createNewProductWithCategories);

export default router;
