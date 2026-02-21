const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ===== CONFIG =====
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "1300853186990575617";
const USER_ID = "511921901677969408";
const TIMEOUT = 20 * 60 * 1000;

let lastWebhookTime = Date.now();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (msg) => {
  if (msg.channel.id !== CHANNEL_ID) return;

  if (msg.webhookId) {
    lastWebhookTime = Date.now();
    console.log("Webhook detected");
  }
});

// เช็คทุก 5 นาที
setInterval(async () => {
  const diff = Date.now() - lastWebhookTime;

  if (diff > TIMEOUT) {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send(`<@${USER_ID}> ⚠️ Webhook หยุดเกิน 20 นาทีแล้ว!`);
    lastWebhookTime = Date.now();
  }
}, 5 * 60 * 1000);

client.login(BOT_TOKEN);