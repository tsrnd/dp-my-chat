import { Logger } from './logger';

export const ErrorHandler = function (err, req, res, next) {
    if (res.statusCode === 500 || res.statusCode === 404) {
        Logger.error(`${req.method}, ${req.path}, ${err.messages}`);
        if (res.statusCode === 500) {
            err.messages = 'Internal Server Error';
        }
        res.send({messages: err.messages});
    }
    let path = req.url;
    if (path === '/') {
        path = 'index';
    } else {
        path = path.slice(1);
    }
    res.render(path, {
        messages: err.messages
    });
};
