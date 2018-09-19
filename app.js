var express = require('express');
var app = express();
var path = require("path");
var mysql = require('mysql');
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_demo'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});



app.get('/', (req, res) => {
    res.render('index', {
        content: 'Hello Express and EJS!'
    });
});


app.get('/register', (req, res) => {
    res.render('register', {
        content: 'register page'
    });
});

app.post('/register', (req, res) => {
    data = req.body

    var post = {
        name: req.body.fname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    };
    var query = connection.query('INSERT INTO user SET ?', post, function (err, result) {
        res.render('register', {
            content: data
        });
    });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
});






app.listen(4000, () => console.log('App listening on port 4000!'));