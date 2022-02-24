//initialize express and bodyparser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//get root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/updatepass', (req, res) => {
    console.log(req.body);
    res.send('success');
});


//listen 3000
app.listen(3000, () => {
    console.log('listening on 3000');
});