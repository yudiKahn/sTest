const router = require('express').Router();
const tryCatchWrapper = require('../service/tryCatchWrapper');
const mongoose = require('mongoose');
const {User} = require('../service/Models');
const {authAdmin} = require('../service/middlewares');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc  register a user
//@route /api/user
router.post('/', tryCatchWrapper(async (req,res)=>{
    const {address, firstName, lastName, email, password, phoneNumber} = req.body.user;
    if(!firstName || !lastName || !email || !phoneNumber || !password || !address) throw new Error("Please fill all required fields");
    const user = new User(req.body.user);
    user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'10 days'});
    user.token = token;
    res.json(user);
}));

//@route /api/user/:id
router
    .route('/:id')
    .get(tryCatchWrapper(async (req,res)=>{
        let users = await User.find();
        res.json(users);
    }))
    .put(tryCatchWrapper((req,res)=>{

    }))
    .delete(tryCatchWrapper(async (req,res)=>{
        const {id} = req.params;
        await User.deleteOne({_id:id});
        res.json(id);
    }));

//@route /api/user/login
router.post('/login', tryCatchWrapper(async (req,res)=>{
    const {email, password} = req.body;
    let users = await User.find({email:email}).lean().exec();
    if(users.length === 0) throw new Error('No user found');
    let user = users[0];
    if(!bcrypt.compareSync(password, user.password)) throw new Error('Password is not right');
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'10 days'});
    user.token = token;
    res.json(user);
}));

//@desc for admin !
//@route /api/user/all
router.get('/all',[authAdmin] , tryCatchWrapper(async (req,res)=>{
    let users = await User.find();
    res.json(users);
}));

//@route /api/user/token/:token
router.post('/token/:token', tryCatchWrapper(async(req,res)=>{
    const {token} = req.params;
    const decode = jwt.decode(token);
    if(!decode.id || Date.now() >= decode.exp * 1000) throw new Error("Token is not valid");
    const user = await User.findById(decode.id);
    if(!user) throw new Error("Token is not valid");
    res.json(user);
}));

module.exports = router;