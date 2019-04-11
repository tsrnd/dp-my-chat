import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';


export class HomeController {
    public index(req: Request, res: Response, next: any) {
        let token = req.cookies.token;
        let userDecoded: any = jwt.decode(token, {complete: true});
        res.render('index', {'userLogin' : userDecoded.payload});
    }
}
