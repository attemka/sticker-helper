const TelegramBot = require("node-telegram-bot-api");
import * as Schedule from "node-schedule";

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });


