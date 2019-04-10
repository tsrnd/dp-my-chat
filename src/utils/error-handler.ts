import { Logger } from './logger';

export const ErrorHandler = function (err, req, res, next) {
    if (res.statusCode === 500) {
        Logger.error(`${req.method}, ${req.path}, ${err.message}`);
        err.message = 'Internal Server Error';
    }
    res.send({message: err.message});
};
