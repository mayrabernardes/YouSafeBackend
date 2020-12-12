var mysql = require('mysql');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

exports.connectDataBase = function(req, res) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'mayra',
        password: 'mayrabernardes20',
        database: 'yousafe'
    });

    fs.createReadStream('./data/phonesteal_09_2020.csv')
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const resultLatLon = results.map((position) => {
                const latitude = position.LATITUDE.replace(/\,/g, '.')
                const longitude = position.LONGITUDE.replace(/\,/g, '.')
                const marca = position.MARCA_CELULAR
                const periodo = position.PERIDOOCORRENCIA
                const local = position.DESCRICAOLOCAL
                if (position.LATITUDE !== null) {
                    con.query(`INSERT INTO ocorrencia(latitude,longitude,crime) VALUES(${parseFloat(latitude)},${parseFloat(longitude)},'Furto de Celular');`, function(err, result) {
                        if (err) throw err;
                        // console.log(result);
                    })
                    con.query(`INSERT INTO descricao(marca_celular, periodo_ocorrencia, descricao_local, id_ocorrencia) VALUES('${marca}', '${periodo}', '${local}', LAST_INSERT_ID() );`, function(err, result) {
                        if (err) throw err;
                            console.log(result);
                    })
                }
            })
        })
}