const express = require('express');

const app = express();
const PORT = 3000;

// Route Methods
app.get('/', (req, res)=>{
    res.send('GET request to the homepage');
});

app.post('/', (req, res)=>{
    res.send('POST request to the homepage');
});

app.put('/', (req, res)=>{
    res.send('PUT request to the homepage');
});

app.delete('/', (req, res)=>{
    res.send('DELETE request to the homepage');
});

app.all('/secret', (req, res)=>{
    res.send('All request to the homepage');
})

// Route Path

// This route path will match requests to /about
app.get('/about', function (req, res) {
    res.send('about')
})

/* The hyphen (-) and the dot (.) are interpreted literally by string-based paths. */
// This route path will match requests to /random.text.
app.get('/random.text', function (req, res) {
    res.send('random.text')
})

// This route path will match requests to /slug-text.
app.get('/slug-text', function (req, res) {
    res.send('slug-text')
})

// This route path will match acd and abcd.
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
})

// This route path will match /pqr and /pqxyr.
app.get('/pq(xy)?r', function (req, res) {
    res.send('pq(xy)?r')
})

// This route path will match axcd, axxcd, axxxcd, and so on.
app.get('/ax+cd', function (req, res) {
    res.send('ax+cd')
})

// This route path will match wxyz, wxayz, wxRANDOMyz, wx123yz, and so on.
app.get('/wx*yz', function (req, res) {
    res.send('wx*yz')
})

/* Examples of route paths based on regular expressions: */
// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
})

// Route Parameters
/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

// Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.
/*
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
*/
app.get('/flights/:from-:to', function (req, res) {
    res.send(req.params)
})
/*
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
*/
app.get('/plantae/:genus.:species', function (req, res) {
    res.send(req.params)
})
/*
Route path: /user/:userId(\\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
*/
app.get('/user/:userId(\\d+)', function (req, res) {
    res.send(req.params)
})

//Route Handlers

//A single callback function can handle a route. For example:
app.get('/example/a', function (req, res) {
    res.send('Hello from A!')
})

//More than one callback function can handle a route (make sure you specify the next object). For example:
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})

//An array of callback functions can handle a route. For example:
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}
  
var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

var cbC = function (req, res) {
    res.send('Hello from C!')
}
  
app.get('/example/c', [cb0, cb1, cbC]);

//A combination of independent functions and arrays of functions can handle a route. For example:
app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from D!')
})

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));