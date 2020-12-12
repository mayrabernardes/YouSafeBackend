var mysql = require('mysql');
const results = [];

const dotenv = require('dotenv')
dotenv.config()

let host = process.env.DB_HOST
let user = process.env.DB_USERNAME
let pass = process.env.DB_PASSWORD
let database = process.env.DB_DATABASE


exports.getLatLonPhoneSteal = function(req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'mayra',
    password: 'mayrabernardes20',
    database: 'yousafe'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT latitude,longitude FROM ocorrencia WHERE crime = 'Furto de Celular'", function(err, result, fields) {
      if (err) throw err;
      const resultLatLon = result.map((position) => {
        const latitude = position.latitude
        const longitude = position.longitude
        const latlon = {
          "title": "Furto de Celular",
          coordinates: {
            "latitude": parseFloat(latitude),
            "longitude": parseFloat(longitude)
          }
        }
        return latlon
      })
      res.send(resultLatLon);
    });
  });
}