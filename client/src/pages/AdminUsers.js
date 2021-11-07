import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {initAdminUsers} from '../redux/actions';
import {Link} from 'react-router-dom';

function AdminUsers({users, initAdminUsers}) {
  const ref = useRef(()=>{});
  ref.current = () => (users && users.length < 1) && initAdminUsers();

  useEffect(()=>{
      ref.current();
  },[]);

  const [nameFilter, setNameFilter] = useState("");

    return (<section className="py-1 dark:bg-gray-800">
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <div className="mb-3 flex">
        <label className="block dark:text-gray-200 text-sm font-bold mb-2 mr-5">Filter by name</label>
        <input onChange={e=>setNameFilter(e.target.value.toLowerCase())} className="shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-900 w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base dark:text-gray-200">
                Users
              </h3>
            </div>
          </div>
        </div>
    
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 dark:text-gray-200 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                </th>
              <th className="px-6 bg-blueGray-50 dark:text-gray-200 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Email
            </th>
               <th className="px-6 bg-blueGray-50 dark:text-gray-200 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Phone
            </th>
              <th className="px-6 bg-blueGray-50 dark:text-gray-200 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Orders  
                </th>
              </tr>
            </thead>
    
            <tbody>
            {
                users.map((v,i)=> ((v.firstName+" "+v.lastName).toLowerCase().includes(nameFilter)) && (<tr key={i}>
                    <th className="dark:text-gray-200 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {v.firstName} {v.lastName}
                    </th>
                    <td className="dark:text-gray-300 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <a href={`mailto:${v.email}`}><i className="fas fa-link"></i> {v.email}</a>
                    </td>
                    <td className="border-t-0 px-6 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">   
                      <a href={`tel:${v.phoneNumber}`}><i className="fas fa-phone"></i> {v.phoneNumber}</a>                   
                    </td>
                    <td className="border-t-0 px-6 border-l-0 border-r-0 text-xs whitespace-nowrap p-4 align-middle">
                      <Link to="/">
                        <i className="fas fa-external-link-square-alt"></i>
                      </Link>
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

export default connect(s=>({users:s.admin.users}), {initAdminUsers})(AdminUsers)
