import { Router } from "express";
import { signIn, SignUp } from "../controllers/auth.controller";

const router = Router();

router.post("/signIn", signIn);

router.post("/signUp", SignUp);

export default router;
