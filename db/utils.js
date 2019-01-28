import mongoose from 'mongoose';
const db = mongoose.connection;
// const stickerpack = mongoose.model('stickerpack');
// const users = mongoose.model('users');
import './models/searchword';
const searchwords = mongoose.model('Searchword');
db.on('error', console.error.bind(console, 'connection error:'));
export const setupConnection = () => mongoose.connect('mongodb://localhost:27017/BOT_DB');

export const getStickerKeywords = stickerId => {
  return searchwords.find({ parentStickerId: stickerId }).then(keywords => keywords.map(keyword => keyword.text));
};

export const addStickerKeyword = (stickerId, keyword) => {
  return searchwords.findOne({ text: keyword }).then(currentSearchword => {
    if (currentSearchword) {
      return { error: true, currentSearchword };
    }

    const newSearchword = new searchwords({
      parentStickerId: stickerId,
      text: keyword
    });

    return newSearchword.save();
  });
};

export const deleteStickerKeyword = (stickerId, keyword) => {
  searchwords.findOne({ text: keyword }).then(currentSearchword => {
    if (currentSearchword) {
      return searchwords.deleteOne({ text: keyword });
    }
  });
};

export const getStickerByKeyword = keyword => {
  return searchwords.findOne({ text: keyword }).then(res => res && res.parentStickerId);
};
