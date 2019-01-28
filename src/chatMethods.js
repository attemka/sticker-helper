import { addStickerKeyword, deleteStickerKeyword, getStickerKeywords } from '../db/utils';

export const handleStickerSend = (bot, msg) => {
  const chatId = msg.chat.id;
  if (msg.chat.type !== 'private' || !msg.sticker) return;
  const stickerId = msg.sticker.file_id;
  getStickerKeywords(stickerId).then(words => {
    bot.sendMessage(chatId, stickerId);
    bot.sendMessage(
      chatId,
      `Id данного стикера: ${stickerId}\n Для данного стикера ${
        words.length
          ? `найдены следующие ключевые фразы: ${words.reduce(
            (str, keyWord) => str + `${keyWord}\n`, ''
            )} \n Для удаление одной из ключевых фраз отправьте команду "delete ${stickerId} ключеваяФраза"`
          : `ключевых фраз не найдено. Для добавления ключевых фраз отправьте команду "add ${stickerId} вашаКлючеваяФраза"`
      }`
    );
  });
};

export const handleMessageSend = (bot, msg) => {
  const chatId = msg.chat.id;
  if (msg.chat.type !== 'private' || !msg.text) return;
  const msgText = msg.text;
  if (msgText.split(' ').length < 3) return;
  const [operation, stickerId, ...keyword] = msgText.split(' ');
  if (operation === 'add') {
    addStickerKeyword(stickerId, keyword.join(' ')).then(res => {
      if (res && res.error) {
        bot.sendMessage(
          chatId,
          `К сожалению, данная фраза уже используется для стикера с id ${res.currentSearchword.parentStickerId}`
        );
      } else {
        bot.sendMessage(chatId, 'Ключевая фраза успешно добавлена');
      }
    });
  } else if (operation === 'delete') {
    deleteStickerKeyword(stickerId, keyword.join(' '));
    bot.sendMessage(chatId, 'Ключевая фраза успешно удалена');
  }
};
