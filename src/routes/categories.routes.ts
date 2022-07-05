import { Router } from "express";
import {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";

//Middlewares
import auth from "../middlewares/authMittleware";

const router = Router();

router.get("/category", getCategories);

router.get("/category/:id", getCategory);

router.post("/category", auth, createCategory);

router.put("/category/:id", auth, updateCategory);

router.delete("/category/:id", auth, deleteCategory);

export default router;
