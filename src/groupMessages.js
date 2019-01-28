import {getStickerByKeyword} from "../db/utils";

export const handleMessage = (bot, msg) => {
    const chatId = msg.chat.id;
    if ((msg.chat.type !== 'group' && msg.chat.type !== 'supergroup' ) || !msg.text) return;
    const msgText = msg.text;
    const [mention, ...keyword] = msgText.split(' ');
    if (mention !== '@st') return;
    getStickerByKeyword(keyword.join(' ')).then(res => {
        bot.sendSticker(chatId, res);
    });
};