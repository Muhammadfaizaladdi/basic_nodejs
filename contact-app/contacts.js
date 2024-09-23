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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
};


const simpanContact = (nama, email, noHP) => {
    const newContact = {
        nama,
        email,
        noHP
    };
  
    const contacts = loadContact()
    
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


const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('Daftar Kontak :'))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`);
    });

};

const detailContact = (nama) => {
    const contacts = loadContact()

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if (!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`))
        return false;
    }else{
        console.log(chalk.cyan.inverse.bold(`${nama}`))
        console.log(contact.noHP)
        if (contact.email){
            console.log(contact.email)
        }
    }
}


const deleteContact = (nama) => {
    const contacts = loadContact()

    const filteredContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
    
    if (contacts.length === filteredContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`))
        return false;
    } else {
        fs.writeFileSync('data/contacts.json', JSON.stringify(filteredContacts))
  
        console.log(chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus `))
    }

}

module.exports = {simpanContact, listContact, detailContact, deleteContact}
