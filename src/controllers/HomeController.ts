import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as  fs from 'fs'; 

export class HomeController {
    public index(req: Request, res: Response, next: any) {
        let token = req.cookies.token;
        var userDecoded: any= jwt.decode(token, {complete: true});
        console.log(userDecoded.payload);
        res.render('index', {'userLogin' : userDecoded.payload});
    }
}
