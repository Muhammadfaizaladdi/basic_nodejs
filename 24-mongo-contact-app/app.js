const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const {body, validationResult, check} = require('express-validator')
const methodOverride = require('method-override')


require('./utils/db')
const Contact = require('./model/contact')


const app = express();
const port = 3000

// setup metho override
app.use(methodOverride('_method'))

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
  
// Halaman Form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {layout: '../layouts/main-layout', title: 'Form Tambah Data Contact'})
})

// process tambah data contact
app.post('/contact', 
  [
  body('nama').custom(async (value) => {
  const duplikat = await Contact.findOne({nama: value});
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
    res.render('add-contact', {layout: '../layouts/main-layout', title: 'Form Tambah Data Contact', errors:errors.array()})
  } else {
  Contact.insertMany(req.body, (error, result) => {
    // kirimkan flash message
    req.flash('msg', 'Data kontak berhasil di tambahkan')
    res.redirect('/contact')
  });

  }
})


// proses delete contact
// app.get('/contact/delete/:nama', async (req, res) => {
//   const contact= await Contact.findOne({nama: req.params.nama})

//   // jika kontak tidak ada
//   if(!contact){
//     res.status(404)
//     res.send('<h1>404</h1>')
//   } else {
//     Contact.deleteOne({ _id : contact._id }).then((result) => {
//       req.flash('msg', 'Data Berhasil di Hapus')
//       res.redirect('/contact')
//     })
//   }
// })

app.delete('/contact', (req, res) => {
      Contact.deleteOne({ nama : req.body.nama }).then((result) => {
        req.flash('msg', 'Data Berhasil di Hapus')
        res.redirect('/contact')
      })
})



// Form ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama:req.params.nama})

  res.render('edit-contact', {layout: '../layouts/main-layout', title: 'Form Ubah Data Contact', contact})
})


// proses ubah data
app.put('/contact', 
  [
  body('nama').custom( async (value, {req}) => {
  const duplikat = await Contact.findOne({ nama: value});
  if (value !== req.body.oldNama && duplikat) {
    throw new Error('Nama kontak sudah digunakan')
  }
  return true;
}), 
check('email', 'Email tidak valid!').isEmail(), 
check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], 
(req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.render('edit-contact', {layout: '../layouts/main-layout', title: 'Form Ubah Data Contact', errors:errors.array(), contact: req.body})
  } else {
  Contact.updateOne(
    { _id: req.body._id}, 
    {$set:  {
      nama: req.body.nama,
      email: req.body.email,
      nohp: req.body.nohp
      },
    }
  ).then((result) => {
      // kirimkan flass message
  req.flash('msg', 'Data kontak berhasil di ubah')
  res.redirect('/contact')
  })

  }
})


// Halaman detail
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});

    res.render('detail', {layout: '../layouts/main-layout', title: 'Halaman Detail Contect', contact:contact})
  })

app.listen(port, () => {
    console.log(`Mongo Contact App | Listening at http://localhost:${port}`)
})
  