import { Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthMiddleWare } from '../utils/middleware/auth';
import { UserController } from '../controllers/UserController';
import { HomeController } from '../controllers/HomeController';
import { Logger } from '../utils/logger';
import { ErrorHandler } from '../utils/error-handler';

export class Routes {
    public authController: AuthController = new AuthController();
    public authMiddleware: AuthMiddleWare = new AuthMiddleWare();
    public userController: UserController = new UserController();
    public homeController: HomeController = new HomeController();

    public routes(app): void {
        app.route('/')
            .get(this.authMiddleware.authorization, this.homeController.index);
        app.get('/login', this.authController.showLogin);
        app.post('/login', this.authController.login);
        app.post('/logout', this.authController.logout);
        app.route('/register')
            .get(this.authController.showRegister)
            .post(this.userController.create);
    }
}
