const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


const app = express()
const port = 3000
// GUnakan EJS
app.set('view engine', 'ejs')
// Third Party Middleware
app.use(expressLayouts)

// Built in middleware to access public folder
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true })); // Middleware url uncoded

// Configurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())


app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Faizal',
      email: 'faizal@gmail.com'
    },
    {
      nama: 'Dody',
      email: 'Dody@gmail.com'
    },
    {
      nama: 'Nisa',
      email: 'Nisa@gmail.com'
    }
  ]

  // res.sendFile('./index.html', { root: __dirname });
  res.render('index', { nama: 'Faizal Addi', title: 'Halaman Home', mahasiswa, layout: '../layouts/main-layout' })
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: '../layouts/main-layout',
    title: 'Halaman About'}
  )
})

app.get('/contact', (req, res) => {
  const contacts = loadContact()
  res.render('contact', {layout: '../layouts/main-layout', title: 'Halaman Contect', contacts:contacts, msg: req.flash('msg'),})
})

// Halaman Form tambah data contact
app.get('/contact/:add', (req, res) => {
  res.render('add-contact', {layout: '../layouts/main-layout', title: 'Form Tambah Data Contact'})
})


// process data contact
app.post('/contact', 
  [
  body('nama').custom((value) => {
  const duplikat = cekDuplikat(value);
  if (duplikat) {
    throw new Error('Nama kontak sudah terdaftar')
  }
  return true;
}), 
check('email', 'Email tidak valid!').isEmail(), 
check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], 
(req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()})
    res.render('add-contact', {layout: '../layouts/main-layout', title: 'Form Tambah Data Contact', errors:errors.array()})
  } else {
  addContact(req.body);
  // kirimkan flass message
  req.flash('msg', 'Data kontak berhasil di tambahkan')
  res.redirect('/contact')
  }
})

// Halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {layout: '../layouts/main-layout', title: 'Halaman Detail Contect', contact:contact})
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
