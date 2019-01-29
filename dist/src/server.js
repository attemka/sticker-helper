"use strict";

var _groupMessages = require("./groupMessages");

var Schedule = _interopRequireWildcard(require("node-schedule"));

var _chatMethods = require("./chatMethods");

var _utils = require("../db/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var TelegramBot = require('node-telegram-bot-api');

var token = process.env.BOT_TOKEN;
var bot = new TelegramBot(token, {
  polling: true
});
(0, _utils.setupConnection)();
bot.on('message', function (msg) {
  var isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
  var hasSticker = !!msg.sticker;

  if (isGroup) {
    (0, _groupMessages.handleMessage)(bot, msg);
  } else if (hasSticker) {
    (0, _chatMethods.handleStickerSend)(bot, msg);
  } else {
    (0, _groupMessages.handleMessage)(bot, msg);
    (0, _chatMethods.handleMessageSend)(bot, msg);
  }
});