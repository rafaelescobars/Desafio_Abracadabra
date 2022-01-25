const express = require("express");
const app = express();
const fs = require('fs');

app.listen(3000, () => {
  console.log("Servidor inicializado en el puerto 3000.");
});

app.use(express.static("assets"));

app.use('/abracadabra/juego/:usuario', (req, res, next) => {

  fs.readFile('usuarios.json', 'utf-8', (err, data) => {
    if (err) throw err
    const {
      usuarios
    } = JSON.parse(data)

    const usuario = req.params.usuario

    if (usuarios.some(element => element === usuario)) {
      next()
    } else {
      res.sendFile(__dirname + '/assets/who.jpeg')
    }
  })
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/abracadabra/usuarios', (req, res) => {
  res.sendFile(__dirname + '/usuarios.json')
})

app.get('/abracadabra/conejo/:n', (req, res) => {
  const numero = Math.floor(Math.random() * (5 - 1)) + 1
  console.log(numero);
  const n = req.params.n

  numero == n ? res.sendFile(__dirname + '/assets/conejito.jpg') : res.sendFile(__dirname + '/assets/voldemort.jpg')
})

app.get('*', (req, res) => {
  res.send('<center><h1>Sorry, aquí no hay nada :/</h1></center>')
})