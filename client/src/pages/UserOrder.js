import React from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { getOrderTotal } from '../utils';

function UserOrder({orders}) {
    const {uid} = useParams();
    const order = orders.find(o=>o._id===uid);

    return (<section className="py-1 bg-blueGray-50 flex-grow dark:bg-gray-800">
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
                order.items.map((v,i)=>(<tr key={i}>
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
    
          </table>
        </div>
      </div>
    </div>
    </section>)
}

export default connect(s=>({orders:s.user.orders}))(UserOrder)
