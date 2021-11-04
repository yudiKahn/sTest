const router = require('express').Router();
const tryCatchWrapper = require('../service/tryCatchWrapper');
const {Order} = require('../service/Models');
const {authAdmin} = require('../service/middlewares');

//@route /api/orders/:uid
router.
    route('/:uid')
    .get(tryCatchWrapper(async (req,res)=>{
        const userOrders = await Order.find({userId: req.params.uid});
        res.json(userOrders);
    }));

//@desc for admin !
//@route /api/orders
router.get('/', [authAdmin], tryCatchWrapper(async(req,res)=>{
    const allOrders = await Order.find();
    res.json(allOrders);
}));

module.exports = router;