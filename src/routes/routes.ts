import { Request, Response } from 'express';

export class Routes {
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.render('index');
            });
        app.route('/login')
            .get((req: Request, res: Response) => {
                res.render('login');
            });
        app.route('/register')
            .get((req: Request, res: Response) => {
                res.render('register');
            });
    }
}
