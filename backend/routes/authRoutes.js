import { Router } from "express";

import { register, login, logout } from "../controllers/authController.js";

const router = Router();

// register route
router.post("/register",register);

// login route
router.post("/login",login);

// logout route
router.post("/logout",logout);

export default router;