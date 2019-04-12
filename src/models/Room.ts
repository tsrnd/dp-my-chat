import * as mongoose from 'mongoose';
import { Counter } from '../models/Counter';

const Schema = mongoose.Schema;

export const Room = new Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },
    name: {
        type: String,
    },
    member: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    room_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: Number,
        default: 1,
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


Room.pre('save', function(next) {
    Counter.findByIdAndUpdate(
        'rooms',
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

export default Room;
