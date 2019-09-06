const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

var db;


MongoClient.connect('mongodb://localhost:27017/examen', (err, client)=> {
    if(err) return console.log(err)
    db = client.db('examen')
    app.listen(3000, function(){
        console.log('listening on 3000.');
    })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Redirect to list
app.get('/', (req, res) => {
  res.redirect('/list')
})

// List all movies
app.get('/list', (req, res) => {
  db.collection('movies').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('list.ejs', { movie: result })
  })
})

// Show the search form
app.get('/search', (req, res) => {
  res.render('search.ejs', { movie: '' })
})

// Find a overtreding
app.post('/searchByName', (req, res) => {
  var input = req.body.film;
  db.collection('movies').find({"film":input}).toArray(function(err, result) {
    if (err) return console.log(err)
    if (result == '')
        res.render('search_not_found.ejs', {})
    else
        res.render('search_result.ejs', { movie: result})
  });
 })



