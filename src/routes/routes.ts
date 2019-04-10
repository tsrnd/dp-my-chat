import { Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthMiddleWare } from '../utils/middleware/auth';

export class Routes {
    public authController: AuthController = new AuthController();
    public authMiddleware: AuthMiddleWare = new AuthMiddleWare();
    public routes(app): void {
        app.route('/')
            .get(this.authMiddleware.authorization, (req: Request, res: Response) => {
                res.render('index');
            });
        app.get('/login', this.authController.index);
        app.post('/login', this.authController.login);
    }
}
