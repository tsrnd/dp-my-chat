import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { Routes } from './routes/routes';
import { ErrorHandler } from './utils/error-handler';

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.app.use(ErrorHandler);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.set('view engine', 'pug');
        this.app.use(express.static(__dirname + '/public'));
        this.app.set('views', __dirname + '/views');
    }
}

export default new App().app;
