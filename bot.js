const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder');
const Vec3 = require('vec3');
const { goals } = pathfinder;
const bot = mineflayer.createBot({
  host: 'play.bcstore.uk', // Ganti dengan alamat server Anda
  port: 25565,
  username: 'OfficialBot',
  version: '1.21.4',
  auth: 'offline',
});

bot.loadPlugin(pathfinder);

// Menggerakkan bot secara acak untuk menghindari AFK
function moveRandomly() {
  setInterval(() => {
    const targetX = Math.floor(Math.random() * 10) + 1;  // Ubah jarak bergerak secara acak
    const targetY = 0; // Selalu di level tanah
    const targetZ = Math.floor(Math.random() * 10) + 1;

    bot.pathfinder.setGoal(new goals.GoalBlock(targetX, targetY, targetZ));
  }, 5000); // Setiap 5 detik
}

bot.on('spawn', () => {
  console.log('Bot has spawned!');
  moveRandomly();
});

bot.on('chat', (username, message) => {
  if (message === 'ping') {
    bot.chat('Pong!');
  }
});

bot.on('error', (err) => {
  console.log('Bot error:', err);
});

bot.on('end', () => {
  console.log('Bot disconnected');
});
