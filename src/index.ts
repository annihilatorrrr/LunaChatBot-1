import { Bot } from "grammy";
import { respond } from "./luna";

const bot = new Bot(process.env.TOKEN || "");

bot.on("message", async (ctx) => {
  const query = ctx.message?.text || ctx.message?.caption;
  if (!query) return;

  if (
    ctx.chat?.type == "private" ||
    ctx.message?.reply_to_message?.from?.id == ctx.me.id ||
    query.toLocaleLowerCase().includes(ctx.me.username.toLocaleLowerCase())
  ) {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(await respond(query), {
      reply_to_message_id: ctx.message.message_id,
      allow_sending_without_reply: true,
    });
  }
});

bot.start();
