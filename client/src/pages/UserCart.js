import React, {useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import { initCart, removeFromCart } from '../redux/actions'
import {Link} from 'react-router-dom';
import {getOrderTotal} from '../utils';

function UserCart({user, initCart, removeFromCart}) {
    const ref = useRef(()=>{});
    ref.current = () =>initCart();
    useEffect(() => {
        ref.current();
    }, [])

    return (<div className="w-full bg-white grid place-content-center my-3">
    <div className="container">
        <div className="rounded-lg shadow-lg overflow-hidden ">
            <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
                {
                    (user.cart?.items?.length > 0) ? `${user.firstName}, Here is your cart` : `No items found ${user.firstName}`
                }
                </h3>
                <div className="flex items-center mt-8">
                    <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase" style={{color:'#c6a530'}}>
                        {user?.cart?.items?.length || 0} Cart
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" style={{borderTopStyle:'solid'}}></div>
                </div>
                <div className="mt-8">
                    <ul className="pl-0">
                    {
                        user.cart?.items?.map((v,i)=><li key={i}>
                            <div className="flex items-start">
                                <div className="text-base leading-6 flex flex-col md:flex-row flex-wrap flex-grow justify-between items-baseline">
                                    <p className="text-gray-700 flex-shrink-0">
                                        {v.name} <small>{v.priceType||null} {v.option||null}</small>
                                    </p>
                                    <div className="flex-shrink-0 mt-1 md:mt-0">
                                        <small className="ml-5 mr-3">{v.q} &times; {v.price.toFixed(2)} = </small>
                                        <span className="text-lg text-gray-800 font-bold">
                                            ${(parseInt(v.q) * v.price.toFixed(2)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start mt-3">
                                <div className="flex-shrink-0">
                                    <span className="rounded-full bg-yellow-700 px-2 py-1 text-xs font-bold mr-3 cursor-pointer">
                                        <i onClick={()=>removeFromCart(user.cart._id, v._id)} className="fas fa-times text-white"></i>                                        
                                    </span>
                                    <span className="rounded-full bg-indigo-400 px-2 py-1 text-xs font-bold mr-3 cursor-pointer">
                                        <i onClick={()=>null} className="fas fa-sort-up text-white align-middle"></i>                                        
                                    </span>
                                    <span>
                                        {v.q}
                                    </span>
                                    <span className="rounded-full bg-indigo-400 px-2 py-1 text-xs font-bold mx-3 cursor-pointer">
                                        <i onClick={()=>null} className="fas fa-sort-down text-white align-text-top"></i>                                        
                                    </span>
                                </div>
                            </div>
                        </li>)
                    }
                    {
                        user.cart && user.cart.items && <li className="mt-10">
                            <div className="flex justify-end">
                                Total: &nbsp;&nbsp;
                                <span className="text-lg text-gray-800 font-bold">${getOrderTotal(user.cart)}</span>
                            </div>
                        </li>
                    }
                    </ul>
                </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-100 sm:p-10 sm:pt-6">
                <Link to="/shop/all" className="cursor-pointer mt-6 rounded-md flex items-center justify-center px-5 py-3 border border-solid border-gray-400 text-lg leading-6 font-medium rounded-md text-gray-700">
                    Go Shopping
                </Link>
            </div>
        </div>
    </div>
</div>)
}

export default connect(s=>({user:s.user}), {initCart, removeFromCart})(UserCart);
