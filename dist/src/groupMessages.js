"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessage = void 0;

var _utils = require("../db/utils");

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var handleMessage = function handleMessage(bot, msg) {
  var chatId = msg.chat.id;
  if (!msg.text) return;
  var msgText = msg.text;

  var _msgText$split = msgText.split(' '),
      _msgText$split2 = _toArray(_msgText$split),
      mention = _msgText$split2[0],
      keyword = _msgText$split2.slice(1);

  if (mention.toLowerCase() !== '@st' && mention.toLowerCase() !== 'st') return;
  (0, _utils.getStickerByKeyword)(keyword.join(' ')).then(function (res) {
    return res && bot.sendSticker(chatId, res);
  });
};

exports.handleMessage = handleMessage;