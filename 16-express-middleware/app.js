const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')


// GUnakan EJS
app.set('view engine', 'ejs')
// Third Party Middleware
app.use(expressLayouts)
app.use(morgan('dev'))

// Application level middleware
app.use((req, res, next) =>{
  console.log('Time :', Date.now())
  next();
})

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
  res.render('contact', {layout: '../layouts/main-layout', title: 'Halaman Contect'})
})

app.get('/product/:id/', (req, res) => {
  res.send(`Product ID : ${req.params.id} dengan category ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
