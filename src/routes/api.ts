
import { Router } from "express";
import { authenticationFilter } from "../middleware/authenticationFilter";
import AuthController from "../controllers/AuthController";
import HomeController from "../controllers/HomeController";
import PostsController from "../controllers/PostsController";
import UserController from "../controllers/UserController";

const router: Router = Router()

router.get('/', HomeController.index)
router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)

//posts
router.get('/posts', [PostsController.getList])
router.get('/posts/featured', [PostsController.getFeatured])
router.post('/posts/create', [authenticationFilter, PostsController.create])
router.get('/posts/:post', [PostsController.getSingle])
router.put('/posts/:post/update', [authenticationFilter, PostsController.update])

//user
router.get('/user/posts', [authenticationFilter, UserController.getPosts])
router.get('/user/userinfo', [authenticationFilter, UserController.getUserInfo])

export default router;