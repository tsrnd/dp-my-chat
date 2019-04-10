import * as mongoose from 'mongoose';
import { Counter } from '../models/Counter';

const Schema = mongoose.Schema;

const User = new Schema({
    _id: {
        type: Number,
        unique: true,
        min: 1,
        auto: true
    },
    username: {
        type: String,
        unique: true,
        require: true,
    },
    nickname: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
});

User.pre('save', function(next) {
    if (this.isNew) {
        Counter.findByIdAndUpdate(
            'users',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        , (error, counter: any) => {
            if (error) {
                console.log(error);
            }
            this._id = counter.seq;
            next();
        });
    }
});

export default User;
