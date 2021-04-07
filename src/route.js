const express=require('express');

const UserController=require('../controllers/UserControllers');
const router=express.Router();
const authMiddleware=require('../middlewares/auth');

router.get('/',(request,response)=>{
    return response.send("hello world!");
})


router.get('/users',authMiddleware,UserController.index);

router.post('/users',UserController.store);

router.put('/users/:user_id',UserController.update);

router.delete('/users/:user_id',UserController.delete);

router.post('/users/login',UserController.login);

module.exports=router;