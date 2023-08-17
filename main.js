const fs = require('fs');
const readline = require('readline');
const axios = require('axios');
const gradient = require('gradient-string');

const banner = `


┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                 │
│ ███████ ███████ ██████  ██    ██ ███████ ██████         ██████ ██   ██ ███████  ██████ ██   ██ ███████ ██████   │
│ ██      ██      ██   ██ ██    ██ ██      ██   ██       ██      ██   ██ ██      ██      ██  ██  ██      ██   ██  │
│ ███████ █████   ██████  ██    ██ █████   ██████  █████ ██      ███████ █████   ██      █████   █████   ██████   │
│      ██ ██      ██   ██  ██  ██  ██      ██   ██       ██      ██   ██ ██      ██      ██  ██  ██      ██   ██  │
│ ███████ ███████ ██   ██   ████   ███████ ██   ██        ██████ ██   ██ ███████  ██████ ██   ██ ███████ ██   ██  │
│                                               FOR FIVEM!!!                                                      │
│                                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                           ======== AUTHOR NotSec_ | Version V1 (Stable) ========                                                                                                           
`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function fetchAndDisplay(url, filename) {
    console.log(gradient.passion('Sedang Memproses Mohon Tunggu...'));
  
    axios.get(url)
      .then(response => {
        const resultPath = `result/${filename}`;
        const responseData = JSON.stringify(response.data, null, 2);
        fs.writeFileSync(resultPath, responseData);
        setTimeout(() => {
          console.clear();
          console.log(gradient.passion(responseData));
          console.log(gradient.summer('Data Ditemukan!!'));
          console.log(`Data Telah Di Tulis Dalam Format .txt! ${resultPath}`);
        }, 15000);
      })
      .catch(error => {
        console.error('Error fetching website:', error.message);
      })
      .finally(() => {
        rl.close();
      });
  }

function handleMenuChoice(choice) {
  switch (choice) {
    case '1':
      rl.question('Masukkan URL website untuk Cek Info: ', function(url) {
        const infoUrl = `${url}/info.json`;
        rl.question('Masukkan Nama Server: ', function(namaServer) {
          const filename = `result_info_${namaServer}.txt`;
          fetchAndDisplay(infoUrl, filename);
        });
      });
      break;
    case '2':
      rl.question('Masukkan URL website untuk Cek Players: ', function(url) {
        const playersUrl = `${url}/player.json`;
        rl.question('Masukkan Nama Server: ', function(namaServer) {
          const filename = `result_players_${namaServer}.txt`;
          fetchAndDisplay(playersUrl, filename);
        });
      });
      break;
    case '3':
      rl.question('Masukkan URL website untuk Cek Dynamic: ', function(url) {
        const dynamicUrl = `${url}/dynamic.json`;
        rl.question('Masukkan Nama Server: ', function(namaServer) {
          const filename = `result_dynamic_${namaServer}.txt`;
          fetchAndDisplay(dynamicUrl, filename);
        });
      });
      break;
    default:
      console.log('Pilihan tidak valid.');
      rl.close();
      break;
  }
}
console.clear()
console.log(gradient.passion(banner))
console.log('Pilih Metode Nya Ngab:');
console.log('>> 1. Cek Info | Mengecek Info Dari Server');
console.log('>> 2. Cek Players | Mengecek Info Player Dari Server');
console.log('>> 3. Cek Dynamic | Mengecek Dynamic Info Dari Server');
console.log('\n╔═══════(root@server)')

rl.question('╚═══⮞ Pilih nomor (1/2/3)~: ', function(choice) {
  handleMenuChoice(choice);
});
