import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { initOrders } from '../redux/actions';
import {Link} from 'react-router-dom';
import {formatDate, getOrderTotal} from '../utils';

const UserOrders = ({ user, initOrders }) => {
    const ref = useRef(()=>{});
    ref.current = () => initOrders(user._id);


    useEffect(()=>{
        ref.current();
    }, []);

    return (<div className="w-full bg-white dark:bg-gray-800 grid place-content-center py-5 flex-grow">
        <div className="container">
            <div className="rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
                    {
                        user.orders.length > 0 ? `${user.firstName}, Here is your orders` : `You have no orders yet ${user.firstName}`
                    }
                    </h3>
                    <div className="flex items-center mt-8">
                        <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase" style={{color:'#c6a530'}}>
                            {user.orders.length} Orders
                        </h4>
                        <div className="flex-1 border-t-2 border-gray-200" style={{borderTopStyle:'solid'}}></div>
                    </div>
                    <div className="mt-8">
                        <ul className="pl-0">
                        {
                            user.orders.map((v,i)=><li key={i}>
                                <Link to={`/user/orders/${v._id}`} className="flex items-start cursor-pointer">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-mouse-pointer"></i>
                                    </div>
                                    <div className="ml-3 text-base leading-6 flex flex-col md:flex-row flex-wrap flex-grow justify-between items-baseline">
                                        <p className="text-gray-700 flex-shrink-0">
                                            {formatDate(v.createdAt)}. {v.items.length} items
                                        </p>
                                        <div className="flex-shrink-0 mt-1 md:mt-0">
                                            <span className="text-lg text-gray-800 font-bold">${getOrderTotal(v)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>)
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

export default connect(s => ({ user: s.user }), { initOrders })(UserOrders)
