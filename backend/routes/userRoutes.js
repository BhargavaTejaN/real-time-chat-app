import { Router } from "express";

import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/userController.js";

const router = Router();

// get users router
router.get("/", protectRoute, getUsersForSidebar);

export default router;
