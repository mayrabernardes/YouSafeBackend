const CarSteal = require("./controller/CarStealController.js"); 
const PhoneSteal = require("./controller/PhoneStealController.js");
const database_carsteal = require("./scripts/Banco_CarSteal.js");
const database_phonesteal = require("./scripts/Banco_PhoneSteal.js");


var express = require('express');
var app = express();

app.get('/dataBaseCarSteal', database_carsteal.connectDataBase);
app.get('/dataBasePhoneSteal', database_phonesteal.connectDataBase);


app.get('/latlonCarSteal', CarSteal.getLatLonCarSteal);
app.get('/latlonPhoneSteal', PhoneSteal.getLatLonPhoneSteal);


app.listen(3000, function() {
  console.log('local server in port :3000!');
});

module.exports = app