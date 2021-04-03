const Sequlize=require('sequelize');

const dbconfig=require('../config/config.json');

const User=require('../models/user')

const connection=new Sequlize(dbconfig);

User.init(connection);
module.exports=connection;