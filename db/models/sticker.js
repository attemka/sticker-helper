import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sticker = Schema({
    id: String,
    keywords: [{type: Schema.Types.ObjectId, ref: 'Searchword'}]
});

mongoose.model('Sticker', sticker);