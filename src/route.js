const express=require('express');

const router=express.Router();

router.get('/',(request,response)=>{
    return response.send("hello world!");
})

module.exports=router;