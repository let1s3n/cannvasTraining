var express = require('express');
var app= express();

app.get('/', function(req,res){
    res.send('Hola mundo!');
})

app.listen(3000, function(err){
    if(err) return console.log('Hubo un erro'), process.exit(1);

    console.log('Escuchando en el puerto 3000');
})