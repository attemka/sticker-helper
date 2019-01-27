import mongoose from 'mongoose';
const db = mongoose.connection;
// const stickerpack = mongoose.model('stickerpack');
// const users = mongoose.model('users');
db.on('error', console.error.bind(console, 'connection error:'));
export function setupConnection() {
    return mongoose.connect('mongodb://localhost:27017/BOT_DB');
}

