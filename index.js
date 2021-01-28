//Module
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

//Conf Connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'health_db'
});

//msg Conf
conn.connect((err) => {
    if (err) throw err;
    console.log('Database Connected!!! :)')
});

//set Path
app.set('views', path.join(__dirname, 'views'));
//set engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set static file => public folder 
app.use('/assets', express.static(__dirname + '/public'));

//route hompage
app.get('/', (req, res) => {
    let sql = "SELECT * from data_penyakit";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('penyakit_view', {
            resluts: results
        });
    });
});

//route add data
app.post('/save', (req, res) => {
    let data = { nama: req.body.nama, jenis_penyakit: req.body.jenis_penyakit, usia: req.body.usia, alamat: req.body.alamat };
    let sql = "INSERT INTO data_penyakit SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route update data
app.post('/update', (req, res) => {
    let sql = "UPDATE health_db SET nama='" + req.body.nama + "', jenis_penyakit='" + req.body.jenis_penyakit + "' WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route delete data 
app.post('delet', (req, res) => {
    let sql = "DELETE FROM health_db WHERE id" + req.body.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(5000, () => {
    console.log('server Runnin on port 5000');
});