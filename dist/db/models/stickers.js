"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;

var stickers = _mongoose.default.Schema({
  stickerId: String,
  filePath: String,
  searchWords: [{
    type: Schema.Types.ObjectId,
    ref: 'Searchword'
  }]
});

_mongoose.default.model('Stickers', stickers);