const router = require('express').Router();
const {Cart} = require('../service/Models');
const tryCatchWrapper = require('../service/tryCatchWrapper');

//@route /api/cart
router
    .route('/')
    .post(tryCatchWrapper(async (req,res)=>{
        let {uid, item} = req.body;
        let cart = await Cart.findOne({userId:uid});
        if(!cart){
            cart = new Cart({userId:uid, items:[item]});
        } else {
            let newItems = Array.from(cart.items);
            let indexOfExist = newItems.
                findIndex(v=>v.price==item.price && v.name == item.name && v.priceType == item.priceType && v.option == item.option);
            if(indexOfExist < 0) cart.items = [...cart.items, item];
            else {
                newItems[indexOfExist].q += item.q;
                console.log(newItems[indexOfExist])
                cart.items = newItems;
            }

        }
        await cart.save();
        res.json(cart);
    }));


//@route /api/cart/:cid/:iid
router.delete('/:cid/:itemId', tryCatchWrapper(async (req,res)=>{
    let {cid,itemId} = req.params;
    let cart = await Cart.findOne({_id:cid});
    let newItems = Array.from(cart.items);
    newItems = newItems.filter(v=>v._id != itemId)
    cart.items = newItems;
    await cart.save();
    res.json(cart);
}))

//@route /api/cart/:id
router.get('/:uid', tryCatchWrapper(async (req,res)=>{
    let {uid} = req.params;
    let cart = await Cart.find({userId:uid});
    res.json({cart:cart[0]});
}))

module.exports = router;