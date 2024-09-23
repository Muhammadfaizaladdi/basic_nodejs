const { tulisPertanyaan, simpanContact } = require('./contacts.js')

const main = async () => {
  const nama = await tulisPertanyaan('Masukkan nama anda: ');
  const email = await tulisPertanyaan('Masukkan email anda: ');
  const noHP = await tulisPertanyaan('Masukkan nomor HP anda: ');

  simpanContact(nama, email, noHP)

}

main();