import * as mongoose from 'mongoose';
import { Counter } from '../models/Counter';

const Schema = mongoose.Schema;

export const BlockUser = new Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },
    user_id_blocked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user_id_blocking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


BlockUser.pre('save', function(next) {
    Counter.findByIdAndUpdate(
        'blockusers',
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

export default BlockUser;
