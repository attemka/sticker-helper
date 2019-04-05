"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessageSend = exports.handleStickerSend = void 0;

var _utils = require("../db/utils");

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var handleStickerSend = function handleStickerSend(bot, msg) {
  var chatId = msg.chat.id;
  if (msg.chat.type !== 'private' || !msg.sticker) return;
  var stickerId = msg.sticker.file_id;
  (0, _utils.getStickerKeywords)(stickerId).then(function (words) {
    bot.sendMessage(chatId, stickerId);
    bot.sendMessage(chatId, "Id \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0441\u0442\u0438\u043A\u0435\u0440\u0430: ".concat(stickerId, "\n \u0414\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0441\u0442\u0438\u043A\u0435\u0440\u0430 ").concat(words.length ? "\u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0444\u0440\u0430\u0437\u044B: ".concat(words.reduce(function (str, keyWord) {
      return str + "".concat(keyWord, "\n");
    }, ''), " \n \u0414\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043E\u0434\u043D\u043E\u0439 \u0438\u0437 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0444\u0440\u0430\u0437 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \"delete ").concat(stickerId, " \u043A\u043B\u044E\u0447\u0435\u0432\u0430\u044F\u0424\u0440\u0430\u0437\u0430\"") : "\u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0444\u0440\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u0414\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0444\u0440\u0430\u0437 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \"add ".concat(stickerId, " \u0432\u0430\u0448\u0430\u041A\u043B\u044E\u0447\u0435\u0432\u0430\u044F\u0424\u0440\u0430\u0437\u0430\"")));
  });
};

exports.handleStickerSend = handleStickerSend;

var handleMessageSend = function handleMessageSend(bot, msg) {
  var chatId = msg.chat.id;
  if (msg.chat.type !== 'private' || !msg.text) return;
  var msgText = msg.text;

  if (msgText === 'reloadStickerFiles') {
    (0, _utils.getAllStickerIds)().then(function (stickerFileIds) {
      console.log(stickerFileIds);
      stickerFileIds.forEach(function (fileId) {
        bot.downloadFile(fileId, "/data/stickers").then(function (path) {
          (0, _utils.addStickerFilePath)(fileId, path);
        });
      });
    });
  }

  if (msgText.split(' ').length < 3) return;

  var _msgText$split = msgText.split(' '),
      _msgText$split2 = _toArray(_msgText$split),
      operation = _msgText$split2[0],
      stickerId = _msgText$split2[1],
      keyword = _msgText$split2.slice(2);

  if (operation === 'add') {
    (0, _utils.getStickerKeywords)(stickerId).then(function (words) {
      if (!words.length) {
        bot.downloadFile(stickerId, "/data/stickers/").then(function (res) {
          return (0, _utils.addStickerFilePath)(stickerId, res);
        });
      }
    });
    (0, _utils.addStickerKeyword)(stickerId, keyword.join(' ')).then(function (res) {
      if (res && res.error) {
        bot.sendMessage(chatId, "\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0434\u0430\u043D\u043D\u0430\u044F \u0444\u0440\u0430\u0437\u0430 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u0441\u0442\u0438\u043A\u0435\u0440\u0430 \u0441 id ".concat(res.currentSearchword.parentStickerId));
        bot.sendSticker(chatId, res.currentSearchword.parentStickerId);
      } else {
        bot.sendMessage(chatId, 'Ключевая фраза успешно добавлена');
      }
    });
  } else if (operation === 'delete') {
    (0, _utils.deleteStickerKeyword)(stickerId, keyword.join(' '));
    bot.sendMessage(chatId, 'Ключевая фраза успешно удалена');
  }
};

exports.handleMessageSend = handleMessageSend;