// Core Module
// File System

const fs = require('fs');

// console.log(fs);


// Menyimpan text ke dalam file secara synchronous

// try{
//     fs.writeFileSync('data/test.txt', 'Hellow World secara synchronuos')
// } catch(e){
//     console.log(e)
// }


// Menuliskan string ke file secara Asynchronous
// fs.writeFile('data/test.txt', 'Hello World secara asssynchronous', (e) => {
//     console.log(e);
// })


// Membaca isi File(Synchronous)
// const data = fs.readFileSync('./data/test.txt', 'utf-8)
// console.log(data.toString());

// read file asyinc
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });


//  Readline module
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
async function logFile() {
  try {
    const filePath = resolve('./data/contact.json');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
    return contents
  } catch (err) {
    console.error(err.message);
  }
}



rl.question('Masukkan nama anda: ', (nama) => {
    rl.question('masukkan noomor hp anda: ', (noHP) => {
        const newContact = {
            nama,
            noHP
        };

        const file = fs.readFileSync('data/contact.json', 'utf-8')
        const contacts = JSON.parse(file)

        contacts.push(newContact)

        fs.writeFileSync('data/contact.json', JSON.stringify(contacts))

        console.log('Terimakasih')

        rl.close()
    })

})