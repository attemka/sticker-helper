import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const searchword = Schema({
    parentStickerId: String,
    text: String,
    stickerPath: {type: Schema.Types.ObjectId, ref: 'Stickers'}
});

mongoose.model('Searchword', searchword);