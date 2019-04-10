import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Logger } from '../utils/logger';
import { ErrorHandler } from '../utils/error-handler';

export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        // app.use(ErrorHandler)
        app.route('/')
            .get((req: Request, res: Response) => {
                res.render('index');
            });
        app.route('/register')
            .get((req: Request, res: Response) => {
                res.render('register');
            })
            .post(this.userController.create);
    }
    // private routes(): void {
    //     this.router.all('*'), function (err, req, res, next) {
    //         console.log('ahihi')
    //         Logger.info(`${req.method}, ${req.path}, ${res.message}`);
    //         if (res.status === 500) {
    //             Logger.error(`${req.method}, ${req.path}, ${res.message}`);
    //         }
    //         console.log(`errrreeeeeeeeeeeeeeeeeeeeeeeeeeeee`)
    //         res.json({message: res.message});
    //     };
    //     this.router.get('/register', (req: Request, res: Response) => {
    //         res.render('register');
    //     });
    //     this.router.post('/register', this.userController.create)
    // }
}
