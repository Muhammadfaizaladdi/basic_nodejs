const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


require('./utils/db')
const Contact = require('./model/contact')


const app = express();
const port = 3000


// Setup EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// Configurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

// Halaman Home
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


// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
      layout: '../layouts/main-layout',
      title: 'Halaman About'}
    )
  })


// Halaman Contact
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    
    res.render('contact', {layout: '../layouts/main-layout', title: 'Halaman Contect', contacts:contacts, msg: req.flash('msg')}) //
  })
  

// Halaman detail
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});

    res.render('detail', {layout: '../layouts/main-layout', title: 'Halaman Detail Contect', contact:contact})
  })

app.listen(port, () => {
    console.log(`Mongo Contact App | Listening at http://localhost:${port}`)
})
  