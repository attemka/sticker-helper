"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var searchword = Schema({
  parentStickerId: String,
  text: String,
  stickerPath: {
    type: Schema.Types.ObjectId,
    ref: 'Stickers'
  }
});

_mongoose.default.model('Searchword', searchword);