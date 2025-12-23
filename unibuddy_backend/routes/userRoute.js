import { Router } from "express";
const userRouter = Router();
import { loginUser, getAllUsers, createUser, CheckIn, GetCurrentCheckIn, getUserById, updateUser, deleteUser, changePassword } from "../controllers/userController.js";

userRouter.post("/login", loginUser);
userRouter.post("/create", createUser);
userRouter.post("/markCheckIn", CheckIn);
userRouter.get("/checkin", GetCurrentCheckIn);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser);
userRouter.put("/change_password", changePassword);

export default userRouter;