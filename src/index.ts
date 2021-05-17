import { Bot } from "grammy";
import { ARQ } from "arq-js";

const bot = new Bot(process.env.TOKEN || "");
const arq = new ARQ(process.env.API_URL || "", process.env.API_KEY || "");

bot.on("message", async (ctx) => {
  const query = ctx.message?.text || ctx.message?.caption;
  if (!query) return;

  if (
    ctx.chat?.type == "private" ||
    ctx.message?.reply_to_message?.from?.id == ctx.me.id ||
    query.toLocaleLowerCase().includes(ctx.me.username.toLocaleLowerCase())
  ) {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(await arq.luna(query, ctx.from.id), {
      reply_to_message_id: ctx.message.message_id,
      allow_sending_without_reply: true,
    });
  }
});

bot.catch((error) => {
  console.log(error.error);
});

bot.start();
