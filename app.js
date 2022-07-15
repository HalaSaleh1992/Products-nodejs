const express= require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const {config} = require('dotenv');
config();

const app = express();
const productsRouter = require('./src/router/productsRouter');
const adminRouter = require('./src/router/adminRouter');


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,"/public/")));

app.set('views','./src/views');
app.set('view engine','ejs');

app.use('/products',productsRouter);
app.use('/admin',adminRouter);

app.get("/home",(req,res)=>{
    res.render('index',{UserName:'hala saleh' ,data:['a','b','c']});
});

app.listen(process.env.PORT,()=>{
    debug(`Listening Application on port ${chalk.green(process.env.PORT)}`);
});