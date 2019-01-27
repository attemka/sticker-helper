import mongoose from 'mongoose';

const searchword = mongoose.Schema({
    id: String,
    parentStickerId: String,
    text: String
});

mongoose.model('Searchword', searchword);