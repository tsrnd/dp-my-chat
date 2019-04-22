import * as mongoose from 'mongoose';
import { Counter } from '../models/Counter';

const Schema = mongoose.Schema;

export const UserRoom = new Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
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


UserRoom.pre('save', function (next) {
    Counter.findByIdAndUpdate(
        'userrooms',
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

export default UserRoom;
