import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const stickers = mongoose.Schema({
    stickerId: String,
    filePath: String,
    searchWords: [{type: Schema.Types.ObjectId, ref: 'Searchword'}]
});

mongoose.model('Stickers', stickers);