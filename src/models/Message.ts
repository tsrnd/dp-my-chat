import * as mongoose from 'mongoose';
import { Counter } from '../models/Counter';

const Schema = mongoose.Schema;

export const Message = new Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    user_id_send: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        unique: true
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


Message.pre('save', function(next) {
    Counter.findByIdAndUpdate(
        'messages',
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

export default Message;
