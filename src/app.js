const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const path = require('path');


// conect to MongoDB
mongoose.connect('mongodb://localhost/crud-mongo')
.then(db => console.log("db conectada") )
.catch(err=> console.log(err))

// import routers
const indexRoutes = require('./routes/index');

// setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', indexRoutes)


app.listen(app.get('port'), ()=>{
    console.log(`Server inicio en el puerto ${app.get('port')}`);
})