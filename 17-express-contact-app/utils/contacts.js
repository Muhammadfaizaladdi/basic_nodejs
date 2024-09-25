const fs = require('fs');

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

// Ambil semua data di contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
};


// Ambil contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact()

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact;
}

module.exports = {loadContact, findContact}