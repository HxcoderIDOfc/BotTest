const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder');
const { goals } = pathfinder;
const Vec3 = require('vec3');

const bot = mineflayer.createBot({
  host: 'play.bcstore.uk',  // Server address
  port: 25565,  // Port default Minecraft (untuk Java Edition)
  username: 'Official', // Nama bot Anda
  version: '1.21.4', // Sesuaikan dengan versi server
  // Jika menggunakan Bedrock, Floodgate harus terpasang di server
});

// Muat plugin pathfinder dengan benar
bot.loadPlugin(pathfinder);

// Menggerakkan bot secara acak untuk menghindari AFK
function moveRandomly() {
  setInterval(() => {
    const targetX = Math.floor(Math.random() * 10) + 1;  // Jarak acak bergerak
    const targetY = 0;  // Tingkat tanah
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
