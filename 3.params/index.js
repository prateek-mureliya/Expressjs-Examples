const express = require('express');

const app = express();
const PORT = 3000;

// Fake database
var users = [
    { name: 'tj' },
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' },
    { name: 'bandit' }
];

// Create HTTP error
function createError(status, message) {
    var err = new Error(message);
    err.status = status;
    return err;
}

// Load user by id
app.param('user', function(req, res, next, id){
    if (req.user = users[id]) {
        next();
    } else {
        next(createError(404, 'failed to find user'));
    }
});

// Convert :to and :from to integers
app.param(['to', 'from'], function(req, res, next, value, key){
    req.params[key] = parseInt(value, 10);
    if( isNaN(req.params[key]) ){
        next(createError(400, 'failed to parseInt '+value));
    } else {
        next();
    }
});

/**
 * GET index.
 */

app.get('/', function(req, res){
    res.send('Visit /user/0 or /users/0-2');
});

/**
 * GET :user.
 */

app.get('/user/:user', function(req, res){
    res.send('user '+req.user.name);
});

/**
 * GET users :from - :to.
 */

app.get('/users/:from-:to', function(req, res, next){
    var from = req.params.from;
    var to = req.params.to;
    var names = users.map(function(user){ return user.name; });
    res.send('users ' + names.slice(from, to + 1).join(', '));
});

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));