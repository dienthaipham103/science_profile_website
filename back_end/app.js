const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();


const usersRouter = require('./api/routes/users');
const profileRouter = require('./api/routes/profiles');

app.use(morgan('dev'));
app.use(bodyParser.json());

// app.use('/products', productsRouter);
// app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/profiles', profileRouter);

app.use((req, res, next)=>{
    const error = new Error("Not found...");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;