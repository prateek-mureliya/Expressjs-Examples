const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// In this case "GET /js/app.js"
// will look for "./public/js/app.js".
app.use(express.static(path.join(__dirname, 'public')));

// if you wanted to "prefix" you may use
// "GET /static/js/app.js" instead of "GET /js/app.js".
app.use('/static', express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// this will allow "GET /style.css" instead of "GET /css/style.css":
app.use(express.static(path.join(__dirname, 'public', 'css')));

app.get('/', (req, res) => res.send([
    '<ul>',
    '<li>HTML</li>',
    '<li><a href="/home.html" target="_blank">/home.html</a></li>',
    '<li>CSS</li>',
    '<li><a href="/style.css" target="_blank">/style.css</a></li>',
    '<li><a href="/css/style.css" target="_blank">/css/style.css</a></li>',
    '<li><a href="/static/css/style.css" target="_blank">/static/css/style.css</a></li>',
    '<li>JS</li>',
    '<li><a href="/js/app.js" target="_blank">/js/app.js</a></li>',
    '<li><a href="/static/js/app.js" target="_blank">/static/js/app.js</a></li>',
    '</ul>'
].join('')));

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));