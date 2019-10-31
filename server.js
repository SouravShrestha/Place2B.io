const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(express.static(path.join(__dirname, 'dist/Place2B')));

//app.use('/api',api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Place2B/index.html'));
});

const port = process.env.port || '4200';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log('Running on port:' + port));