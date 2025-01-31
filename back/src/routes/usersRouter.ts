import { Router } from "express";
import { getUsers, 
         getUserbyId,
         createUser,
         loginUser} from "../controllers/userController";

const userRouter: Router = Router();

userRouter.get("/" , getUsers);
userRouter.get("/:id" , getUserbyId);
userRouter.post("/register" , createUser);
userRouter.post("/login" , loginUser );     

export default userRouter;