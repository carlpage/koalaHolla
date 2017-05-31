var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var port = process.env.PORT || 8080;

// globals
var pg = require('pg');
var config = {
  database: 'Koala',
  host: 'localhost',
  port: 5432, // always use this port for localhost postgresql
  max: 12
};

var pool = new pg.Pool(config);

// static folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// spin up server
app.listen(port, function() {
  console.log('server up on', port);
});

// base url
app.get('/', function(req, res) {
  console.log('base url hit');
  res.sendFile('index.html');
});

// get koalas
app.get('/koalas', function(req, res) {
  console.log('GET koalas route hit');
  //assemble object to send
  var objectToSend = {
    response: 'from GET koalas route'
  }; //end objectToSend
  //send info back to client
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('err connecting to db');
      done();
      res.send('totally dsfahkasdhfjk')
    } else {
      console.log('connected to db');
      var allKoalas = [];
      var resultSet = connection.query('SELECT * from koalaHolla');
      resultSet.on('row', function(row) {
        allKoalas.push(row);
      }); //end
      resultSet.on('end', function() {
        done();
        res.send(allKoalas);
      });
    } //end no error
  }); // end pool connect
});

// add koala
app.post('/koalas', urlencodedParser, function(req, res) {
  console.log('POST koalas route hit');
  //assemble object to send
  var objectToSend = {
    response: 'from POST koalas route'
  }; //end objectToSend
  console.log(req.body);
  //send info back to client
  res.send(objectToSend);
});

// add koala
app.put('/koalas', urlencodedParser, function(req, res) {
  console.log('PUT koalas route hit');
  //assemble object to send
  var objectToSend = {
    response: 'from PUT koalas route'
  }; //end objectToSend
  //send info back to client
  res.send(objectToSend);
});
