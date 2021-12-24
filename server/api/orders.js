const router = require('express').Router();
const tryCatchWrapper = require('../service/tryCatchWrapper');
const {Order, Cart} = require('../service/Models');
const {authAdmin} = require('../service/middlewares');

//@desc  get all orders for a user
//@route /api/orders/:uid
router.
    route('/:uid')
    .get(tryCatchWrapper(async (req,res)=>{
        const userOrders = await Order.find({userId: req.params.uid});
        res.json(userOrders);
    }));

//@desc    delete an order
//@route  /api/orders/order/:oid
router.route('/order/:oid')
    .delete(tryCatchWrapper(async (req,res)=>{
        const {oid} = req.params;
        let order = await Order.findById(oid);
        if(order.isDone) throw new Error("Cannot delete order once done. contact yanky to change status of order");
        await Order.findOneAndDelete({_id:oid});
        res.json(order);      
    }));

//@desc get method to retrive all orders for admin !
//@route /api/orders
router.route('/')
    .get([authAdmin], tryCatchWrapper(async(req,res)=>{
        const allOrders = await Order.find();
        res.json(allOrders);
    })) /* @desc create order form cart */
    .post(tryCatchWrapper(async (req,res)=>{
        const {cart} = req.body;
        let newOrder = {
            ...cart,
            items: cart.items.map(i=>({
                ...i,
                type:i.name,
                byAdmin: false
            })),
            isDone:false,
            isPaid:false
        }
        newOrder = new Order(newOrder);
        await newOrder.save();
        await Cart.findByIdAndDelete(cart._id);
        res.json(newOrder);
    }));

module.exports = router;