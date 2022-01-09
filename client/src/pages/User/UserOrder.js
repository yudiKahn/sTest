import React, { useEffect, useRef, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { getOrderTotal } from '../../utils';
import {initOrders, deleteOrder} from '../../redux/actions';

function UserOrder({userId, orders, initOrders, deleteOrder}) {
    const {uid} = useParams();
    const [order,setOrder] = useState({});

    const _initOrder = useRef(()=>{});
    _initOrder.current = () => setOrder(Array.from(orders).find(o=>o._id===uid));
    const _initOrders = useRef(()=>{});
    _initOrders.current = () => orders.length === 0 ? initOrders(userId) : undefined;
    
    useEffect(()=>{
      _initOrders.current();
    },[]);
    useEffect(()=>{
      _initOrder.current();
    },[orders]);

    return order?.items ? (<section className="py-1 bg-blueGray-50 flex-grow dark:bg-gray-800">
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-900 w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700 dark:text-gray-200">Order Items</h3>
            </div>
          </div>
        </div>
    
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 dark:text-gray-200 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Item
                </th>
                <th className="px-6 bg-blueGray-50 dark:text-gray-200 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Price
                </th>
                <th className="px-6 bg-blueGray-50 dark:text-gray-200 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Qty
                </th>
              </tr>
            </thead>
    
            <tbody>
            {
                order?.items?.map((v,i)=>(<tr key={i}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  dark:text-gray-200 text-blueGray-700">
                      {v.type}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 dark:text-gray-200">
                      ${v.price.toFixed(2)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 dark:text-gray-200">
                      {v.q}
                    </td>
                  </tr>))
            }
              <tr>
                <td></td>
                <th className="text-right border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 dark:text-gray-200">
                  Total:
                </th>
                <td className="text-left border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 dark:text-gray-200">
                  ${getOrderTotal(order)}
                </td>
              </tr>
            </tbody>
    
            <tfoot className="py-4">
              <tr>
                <td className="w-full px-4">
                  <h3 className="font-semibold text-base text-blueGray-700 dark:text-gray-200">Order Actions</h3>
                </td>
              </tr>
              <tr className="flex px-3 py-2">
                <td>
                  <button className="mx-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={()=>deleteOrder(order._id, order?.isDone)}>
                    Delete
                  </button>
                </td>
                <td>
                  <Link to="/" className="block mx-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                    Modify
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    </section>) : (<div className="relative overflow-hidden bg-white dark:bg-gray-900 flex-grow">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex py-32 xl:py-40">
        <h1 className="drop-shadow-lg text-4xl font-extrabold tracking-tight text-green-600 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            Can't find order...
        </h1>
      </div>
    </div>);
}

export default connect(s=>({userId:s.user._id, orders:s.user.orders}), {initOrders, deleteOrder})(UserOrder)
