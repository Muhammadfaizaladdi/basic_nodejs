const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {

  res.sendFile('./index.html', { root: __dirname });
  
  // res.json({
  //   nama: 'Faizal',
  //   email: 'faizal@gmail.com'
  // })

  // res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root: __dirname });
  // res.send('Ini adalah halaman About!')
})

app.get('/contact', (req, res) => {
  res.sendFile('./contact.html', { root: __dirname });
  // res.send('Ini adalah halaman Contact!')
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







// const http = require('http')
// const port = 3000
// const fs = require('fs')

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data)=>{
//         if(err){
//             res.writeHead(404)
//             res.write('Error:File not found')
//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type' : 'text/html'
//     });
//     const url = req.url;

//     switch (url){
//         case '/about':
//             renderHTML('./about.html', res);
//             break;
//         case '/contact':
//             renderHTML('./contact.html', res);
//             break;
//         default:
//             renderHTML('./index.html', res);
//             break;
//     }


//     // Routing manual dengan if      
//     // if(url === '/about'){
//     //     renderHTML('./about.html', res)
//     // } else if(url === '/contact'){
//     //     renderHTML('./contact.html', res)
//     // } else {
//     //     renderHTML('./index.html', res)
//     // }
// }).listen(port, () => {
//     console.log(`Server is listening on port ${port}..`)
// })