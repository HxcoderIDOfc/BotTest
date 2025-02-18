const mineflayer = require('mineflayer');
const { setInterval } = require('timers');

const bot = mineflayer.createBot({
  host: 'server-address', // Ganti dengan alamat server Minecraft kamu
  port: 25565, // Ganti dengan port server kamu
  username: 'bot-email@example.com', // Ganti dengan email Minecraft bot
  auth: 'microsoft', // Jika kamu menggunakan akun Microsoft
});

bot.on('spawn', () => {
  console.log('Bot is online');
  
  // Membuat bot bergerak dan berputar secara acak
  setInterval(() => {
    moveRandomly();
    rotateRandomly();
  }, 3000); // Setiap 3 detik sekali bot akan bergerak dan berputar acak
});

bot.on('error', (err) => {
  console.error('Bot encountered an error:', err);
});

bot.on('end', () => {
  console.log('Bot disconnected');
});

// Fungsi untuk membuat bot bergerak acak
function moveRandomly() {
  const x = Math.random() * 2 - 1; // Acak antara -1 dan 1
  const z = Math.random() * 2 - 1; // Acak antara -1 dan 1
  bot.setControlState('forward', true);
  
  bot.setTimeout(() => {
    bot.setControlState('forward', false);
  }, 500 + Math.random() * 1000); // Bot bergerak maju selama 500-1500 ms
  
  bot.lookAt(bot.entity.position.offset(x, 0, z));
}

// Fungsi untuk membuat bot berputar acak
function rotateRandomly() {
  const yaw = Math.random() * 360; // Rotasi acak dalam 360 derajat
  const pitch = Math.random() * 180 - 90; // Rotasi vertikal acak antara -90 dan 90
  
  bot.look(yaw, pitch, true); // Mengarahkan bot ke sudut acak
}
