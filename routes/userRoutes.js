import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  updateUserController,
  getUserController,
} from "../controllers/userController.js";

// Router Object
const router = express.Router();

//Routes
//GET USER DATA || POST
router.post("/getUser", userAuth, getUserController);

//UPDATE USERS || PUT

router.put("/update-user", userAuth, updateUserController);

export default router;
