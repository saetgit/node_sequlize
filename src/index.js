const express=require('express');
require('dotenv').config();
const passport = require('passport');
// Bring in the passport authentication strategy
require('../config/passport')(passport);

const route=require('./route');

require('../config/config.json');

const app=express();

app.use(express.json());

app.use(route)

app.listen(3333);
