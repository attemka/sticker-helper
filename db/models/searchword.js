import mongoose from 'mongoose';

const searchword = mongoose.Schema({
    parentStickerId: String,
    text: String
});

mongoose.model('Searchword', searchword);