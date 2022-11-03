const express = require('express');
const app = express();
const port = 8888;

app.get('/', (req, res) => {
    res.send('Hello World2');
})

app.listen(port, () => {
    console.log(`Sever app listening on port ${port}`);
})