import {App} from './app'
import { AuthController } from './controllers/AuthController';
import { Controller } from './controllers/Controller';
import { FilesController } from './controllers/FilesController';
import { PostsController } from './controllers/PostsController';
import { TagsController } from './controllers/TagsController';
import { UserController } from './controllers/UserController';

const controllers: Controller[] =  [
    new PostsController('/posts'),
    new AuthController('/auth'),
    new FilesController('/files'),
    new UserController('/user'),
    new TagsController('/tags')
]

const app = new App(controllers);

app.listen();