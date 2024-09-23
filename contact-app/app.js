// Mengambil argumen dari command line
const yargs = require('yargs')
const { simpanContact } = require('./contacts')

// console.log(yargs.argv)


yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor HP Aktif',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHP)
  },
})


yargs.parse()





// const { tulisPertanyaan, simpanContact } = require('./contacts.js')

// const main = async () => {
//   const nama = await tulisPertanyaan('Masukkan nama anda: ');
//   const email = await tulisPertanyaan('Masukkan email anda: ');
//   const noHP = await tulisPertanyaan('Masukkan nomor HP anda: ');

//   simpanContact(nama, email, noHP)

// }

// main();