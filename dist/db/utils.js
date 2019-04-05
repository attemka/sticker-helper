"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPathByStickerId = exports.addStickerFilePath = exports.getStickerByKeyword = exports.getAllStickerIds = exports.deleteStickerKeyword = exports.addStickerKeyword = exports.getStickerKeywords = exports.setupConnection = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("./models/searchword");

require("./models/stickers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoose.default.connection; // const stickerpack = mongoose.model('stickerpack');
// const users = mongoose.model('users');

var searchwords = _mongoose.default.model('Searchword');

var stickers = _mongoose.default.model('Stickers');

db.on('error', console.error.bind(console, 'connection error:'));

var setupConnection = function setupConnection() {
  return _mongoose.default.connect('mongodb://127.0.0.1:27017/BOT_DB');
}; // mongoose.connect('mongodb://localhost:27017/BOT_DB');


exports.setupConnection = setupConnection;

var getStickerKeywords = function getStickerKeywords(stickerId) {
  return searchwords.find({
    parentStickerId: stickerId
  }).then(function (keywords) {
    return keywords.map(function (keyword) {
      return keyword.text;
    });
  });
};

exports.getStickerKeywords = getStickerKeywords;

var addStickerKeyword = function addStickerKeyword(stickerId, keyword) {
  return searchwords.findOne({
    text: keyword
  }).then(function (currentSearchword) {
    if (currentSearchword) {
      return {
        error: true,
        currentSearchword: currentSearchword
      };
    }

    var newSearchword = new searchwords({
      parentStickerId: stickerId,
      text: keyword
    });
    return newSearchword.save();
  });
};

exports.addStickerKeyword = addStickerKeyword;

var deleteStickerKeyword = function deleteStickerKeyword(stickerId, keyword) {
  searchwords.findOne({
    text: keyword
  }).then(function (currentSearchword) {
    if (currentSearchword) {
      return searchwords.deleteOne({
        text: keyword
      });
    }
  });
};

exports.deleteStickerKeyword = deleteStickerKeyword;

var getAllStickerIds = function getAllStickerIds() {
  return searchwords.distinct('parentStickerId', function (err, res) {
    if (err) {
      return err;
    }

    return res;
  });
};

exports.getAllStickerIds = getAllStickerIds;

var getStickerByKeyword = function getStickerByKeyword(keyword) {
  return searchwords.findOne({
    text: keyword
  }).then(function (res) {
    return res && res.parentStickerId;
  });
};

exports.getStickerByKeyword = getStickerByKeyword;

var addStickerFilePath = function addStickerFilePath(stickerId, filePath) {
  var newSticker = new stickers({
    stickerId: stickerId,
    filePath: filePath
  });
  return newSticker.save();
};

exports.addStickerFilePath = addStickerFilePath;

var getPathByStickerId = function getPathByStickerId(id) {
  var sticker = stickers.findOne({
    stickerId: id
  });
  return sticker && sticker.filePath;
};

exports.getPathByStickerId = getPathByStickerId;