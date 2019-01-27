

export const handleStickerSend = (bot, msg) => {
    const chatId = msg.chat.id;
    if (msg.chat.type !== 'private' || !msg.sticker) return;
    bot.sendMessage()
}