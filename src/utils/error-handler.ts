import { Logger } from './logger';

export const ErrorHandler = function (err, req, res, next) {
    Logger.info(`${req.method}, ${req.path}, ${err.message}`);
    if (res.status === 500) {
        Logger.error(`${req.method}, ${req.path}, ${err.message}`);
        err.message = 'Internal Server Error'
    }
    res.json({message: err.message});
}
