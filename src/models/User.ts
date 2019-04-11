import * as mongoose from 'mongoose';
import { Counter } from '../models/Counter';

const Schema = mongoose.Schema;

export const User = new Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    nickname: {
        type: String,
    },
    user_profile_image: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});


User.pre('save', function(next) {
    Counter.findByIdAndUpdate(
        'users',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    , (error: any, counter: any) => {
        if (error) {
            next(new mongoose.Error('Counter.findByIdAndUpdate() error'));
        }
        this.id = counter.seq;
        next();
    });
});

export default User;
