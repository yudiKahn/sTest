import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {initAdminOrders} from '../redux/actions';
import {getOrderTotal} from '../utils';

function AdminOrders({orders, initAdminOrders}) {
    const ref = useRef(()=>{});
    ref.current = () => (orders && orders.length < 1) && initAdminOrders();
    useEffect(()=>{
        ref.current();
    },[]);

    return (<section className="py-1 bg-blueGray-50">
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">Users</h3>
            </div>
          </div>
        </div>
    
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Email
            </th>
               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Qty
            </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      
                </th>
              </tr>
            </thead>
    
            <tbody>
            {
                orders.map((v,i)=>(<tr key={i}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">      
                                    ${getOrderTotal(v)}
                    </td>
                  </tr>))
            }
            </tbody>
    
          </table>
        </div>
      </div>
    </div>
    </section>)
}

export default connect(s=>({orders:s.admin.orders}), {initAdminOrders})(AdminOrders)
