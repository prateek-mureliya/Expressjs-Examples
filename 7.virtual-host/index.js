const express = require('express');

/*
edit /etc/hosts:
127.0.0.1       foo.example.com
127.0.0.1       bar.example.com
127.0.0.1       www.example.com
*/

const app = express();
const PORT = 3000;

const foo = express();
const bar = express();

const vhost = (hostname, app) => (req, res, next) => {
    const host = req.headers.host.split(':')[0];
    console.log(host, hostname);
    if(hostname === host)
        app(req, res, next);
    else
        next();
}

app.use(vhost('foo.example.com', foo));
app.use(vhost('bar.example.com', bar));

app.get('*', (req, res)=>{
    res.send("Server www.example.com")
});

foo.get('*', (req, res)=>{
    res.send("Server foo.example.com")
});

bar.get('*', (req, res)=>{
    res.send("Server bar.example.com")
});

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));