const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

const simpanContact = (nama, email, noHP) => {
    const newContact = {
        nama,
        email,
        noHP
    };
  
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)

    // Cek Duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain'))
        return false;
    }

    // Cek noomor HP
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold('Nomor HP tidak valid'))
        return false;
    }
    

    // Cek Email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid'))
            return false;
        }
    }

    contacts.push(newContact)
  
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
  
    console.log(chalk.green.inverse.bold('Terimakasih sudah menambahkan data'))
  
}

module.exports = {simpanContact}
