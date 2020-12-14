const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send(`<ul>
    <li>Download <a href="/files/amazing.txt" target="_blank">amazing.txt</a>.</li>
    <li>Download <a href="/files/missing.txt" target="_blank">missing.txt</a>.</li>
    <li>Download <a href="/files/CCTV大赛上海分赛区.txt" target="_blank">CCTV大赛上海分赛区.txt</a>.</li>
    </ul>`);
});

app.get('/files/:file(*)', function(req, res){
    const filePath = path.join(__dirname, 'files', req.params.file);
    
    res.download(filePath, function(err){
        if (!err) return;

        if (err.status !== 404) return next(err); // non-404 error

        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
    });
});

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));