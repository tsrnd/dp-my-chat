import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Logger } from '../utils/logger';
import { ErrorHandler } from '../utils/error-handler';

export class Routes {
    public userController: UserController = new UserController();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.render('index');
            });
        app.route('/register')
            .get(this.userController.register)
            .post(this.userController.create);
        app.route('/login')
            .get((req: Request, res: Response) => {
                res.render('login');
            });
    }
}
