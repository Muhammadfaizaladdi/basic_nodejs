const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')


const app = express()
const port = 3000
// GUnakan EJS
app.set('view engine', 'ejs')
// Third Party Middleware
app.use(expressLayouts)

// Built in middleware to access public folder
app.use(express.static('public'))

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
  res.render('contact', {layout: '../layouts/main-layout', title: 'Halaman Contect', contacts:contacts})
})

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
