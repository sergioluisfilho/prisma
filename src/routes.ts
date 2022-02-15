import { Router } from "express";
const routes = Router();

import UserController from "./controllers/UserController"
import PostController from "./controllers/PostController"

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/posts/publish', PostController.update);
routes.delete('/posts/delete/:id', PostController.destroy);
routes.post('/posts', PostController.create);
routes.get('/posts/:id', PostController.show);

export default routes;