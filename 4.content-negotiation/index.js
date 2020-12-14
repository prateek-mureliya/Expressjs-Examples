const express = require('express');
const users = require('./db');

const app = express();
const PORT = 3000;

// one way to contect negotiation
app.get('/', function(req, res){
    res.format({
        html: function(){
            res.send('<ul>' + users.map(function(user){
            return '<li>' + user.name + '</li>';
            }).join('') + '</ul>');
        },

        text: function(){
            res.send(users.map(function(user){
            return ' - ' + user.name + '\n';
            }).join(''));
        },

        json: function(){
            res.json(users);
        }
    });
});

// second way to contect negotiation
app.get('/users', function(req, res){
    var obj = require('./users');
    res.format(obj);
});

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));