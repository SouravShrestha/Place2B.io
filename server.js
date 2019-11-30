const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(express.static(path.join(__dirname, 'dist/Place2B')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.use('/api',api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Place2B/index.html'));
});

const port = process.env.port || '4200';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running on port:' + port));