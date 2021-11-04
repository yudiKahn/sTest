const router = require('express').Router();
const {Item} = require('../service/Models');
const tryCatchWrapper = require('../service/tryCatchWrapper');

//@route /api/items/
router
    .route('/')
    .get(tryCatchWrapper(async (req,res)=>{
        let items = await Item.find();
        res.json(items);
    }))
    .post(tryCatchWrapper(async (req,res)=>{
        let item = new Item(req.body.item);
        let alreadyExist = await Item.find({name:item.name});
        if(alreadyExist.length > 0) throw new Error('Item already exist');
        if(item.prices.length < 1 || !item.name || !item.category) throw new Error('Please fill all required fields');
        await item.save();
        res.json(item);
    }));

module.exports = router;