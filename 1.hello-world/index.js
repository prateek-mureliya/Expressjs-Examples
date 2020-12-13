const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send("hello world in express")
});

app.listen(PORT, ()=> console.log(`listing port http://localhost:${PORT}/`));