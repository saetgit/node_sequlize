const Sequlize=require('sequelize');

const dbConfig=require('../config/database');

const connection=new Sequlize(dbConfig);

try{
    connection.authenticate();
    console.log("success");
}catch(error){
    console.error("unable connectiton database",error);
}

module.exports=connection;