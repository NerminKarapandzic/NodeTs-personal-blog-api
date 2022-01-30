
import { Router } from "express";
import { authenticationFilter } from "../middleware/authenticationFilter";
import AuthController from "../controllers/AuthController";
import HomeController from "../controllers/HomeController";
import PostsController from "../controllers/PostsController";

const router: Router = Router()

router.get('/', HomeController.index)
router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)

//posts
router.post('/posts/create', [authenticationFilter, PostsController.create])

export default router;