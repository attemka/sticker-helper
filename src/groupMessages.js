import { getStickerByKeyword } from '../db/utils';

export const handleMessage = (bot, msg) => {
  const chatId = msg.chat.id;
  if (!msg.text) return;
  const msgText = msg.text;
  const [mention, ...keyword] = msgText.split(' ');
  if (mention.toLowerCase() !== '@st' && mention.toLowerCase() !== 'st') return;
  getStickerByKeyword(keyword.join(' ')).then(res => res && bot.sendSticker(chatId, res));
};
