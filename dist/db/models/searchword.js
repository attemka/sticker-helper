"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchword = _mongoose.default.Schema({
  parentStickerId: String,
  text: String
});

_mongoose.default.model('Searchword', searchword);