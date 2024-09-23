const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// Membuat Folder data
const dirPath = './data'
if (!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath)
}

// Membuat File contacs.json jika belum ada
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama)
    });
  })
}

const simpanContact = (nama, email, noHP) => {
    const newContact = {
        nama,
        email,
        noHP
    };
  
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
  
    contacts.push(newContact)
  
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
  
    console.log('Terimakasih')
  
    rl.close()
}

module.exports = {tulisPertanyaan, simpanContact}
