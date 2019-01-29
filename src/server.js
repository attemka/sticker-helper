import { handleMessage } from './groupMessages';

const TelegramBot = require('node-telegram-bot-api');
import * as Schedule from 'node-schedule';
import { handleMessageSend, handleStickerSend } from './chatMethods';
import { setupConnection } from '../db/utils';

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });
setupConnection();

bot.on('message', msg => {
  const isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
  const hasSticker = !!msg.sticker;
  if (isGroup) {
    handleMessage(bot, msg);
  } else if (hasSticker) {
    handleStickerSend(bot, msg);
  } else {
    handleMessage(bot, msg);
    handleMessageSend(bot, msg);
  }
});
