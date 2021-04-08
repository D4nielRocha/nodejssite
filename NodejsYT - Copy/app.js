// require imports packages required by the application
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Specify Host and port
const HOST = '127.0.0.1';
const PORT = 8080;

let app = express();


app.use((req, res, next) => {

res.setHeader("Content-Type", "application/json");
next();
});

app.use(express.text());


app.use(express.json());

app.use(express.urlencoded({
extended: true
}));


app.use(cors({ credentials: true, origin: true }));
app.options('*', cors()); 

app.use('/', require('./controllers/index'));

app.use('/message', require('./controllers/messageContoller.js'));

app.use((req, res, next) => {
const err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
err.status = 404;
next(err);
});

const server = app.listen(PORT, HOST, () => {
console.log(`Express server listening on http://localhost:${PORT}`);
});

module.exports = app;