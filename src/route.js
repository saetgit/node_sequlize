const express=require('express');

const UserController=require('../controllers/UserControllers');
const router=express.Router();
const passport = require("passport");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

router.get('/',(request,response)=>{
    return response.send("hello world!");
})


router.get('/users',UserController.index);

router.post('/users',UserController.store);

router.put('/users/:user_id',passportJWT,UserController.update);

router.delete('/users/:user_id',UserController.delete);

router.post('/users/login',passportSignIn ,UserController.login);

module.exports=router;