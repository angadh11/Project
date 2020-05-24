const express = require('express');
const bodyParser= require('body-parser');

const mongoose=require('mongoose');
const path=require('path');

//setup express
const app = express();
mongoose.Promise=global.Promise;



mongoose.connect('mongodb://localhost/database');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('routes'));
 

app.set('view engine','pug');
app.set('views','./routes');
//app.engine('pug', require('pug').__express);

 //routes
 app.use('/api',require('./routes/api'));



app.listen(3001,function(){
console.log("server started")


});
