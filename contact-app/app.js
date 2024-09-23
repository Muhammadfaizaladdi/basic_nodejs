// Mengambil argumen dari command line
const yargs = require('yargs')
const { simpanContact, listContact, detailContact, deleteContact} = require('./contacts')

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
}).demandCommand()


// Menampilkan daftar semua nama dan nomor telp contact

yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama dan nomor hp kontak',
  handler() {
    listContact();
  },
})


// Menampilkan detail kontak
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
  builder:{
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
})


// Menghappus kontak berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah kontak berdasarkan nama',
  builder:{
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
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