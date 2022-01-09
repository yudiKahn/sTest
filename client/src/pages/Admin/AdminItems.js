import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { initCategories, initItems } from '../../redux/actions';

function AdminItems({categories, items, initCategories, initItems}) {
    const [isPrices, setIsPrices] = useState(false);
    const ref = useRef(()=>{});
    ref.current = () => {
      initCategories();
      initItems();
    }
    useEffect(()=>{
      ref.current();
    },[]);
    const onSubmit = async e => {
      e.preventDefault();
      let isArr = /(options|prices|pricesTypes)/;
      let obj = {}; new FormData(e.target).forEach((v,k)=> obj[k] = (isArr.test(k) ? v.split(',') : v));
      console.log(obj)
      let resp = await axios.post('/api/items', {item:obj});
      console.log(resp.data)
    }

    return (<div className="mt-10 sm:mt-0">
    <div className="md:grid md:grid-cols-2 md:gap-6">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={onSubmit}>
          <div className="m-2 shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
  
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select required id="category" name="category" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {
                        categories.map((v,i)=> <option value={v} key={i}>{v}</option>)
                    }
                  </select>
                </div>
                <Link 
                    to="/admin/items/categories"
                    className="col-span-6 sm:col-span-3 max-w-max place-self-center bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                >
                    Create new Category
                </Link>
  
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input required type="text" name="name" id="name" placeholder="e.g Israeli set" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="prices" className="block text-sm font-medium text-gray-700">Price/s</label>
                  <input required placeholder="e.g 25, 30, 45" onChange={e => setIsPrices(e.target.value.split(',').length > 1)} type="text" name="prices" id="prices" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                {
                  isPrices && <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="pricesTypes" className="block text-sm font-medium text-gray-700">Prices Types</label>
                    <input type="text" placeholder="C, B, A" name="pricesTypes" id="pricesTypes" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                  </div>
                }
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="options" className="block text-sm font-medium text-gray-700">Options</label>
                  <input placeholder="e.g Pitom, No Pitom" type="text" name="options" id="options" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="m-2 shadow overflow-hidden sm:rounded-md">
      <div className="block w-full overflow-x-auto">
        <table className="items-center bg-transparent w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                <i className="fas fa-trash-alt"></i>
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Category
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Name
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Price/s
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
          {
            items.map((v,i)=> <tr key={i}>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-times cursor-pointer text-red-600"></i>
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                {v.category}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {v.name}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {v.prices.map((p,i)=> `${i > 0 ? ',':''} $${p.toFixed(2)} ${v.pricesTypes[i]}`)}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {v.options.map((o,i)=> `${i > 0 ? ',':''} ${o}`)}
              </td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default connect(s=>({categories:s.app.categories, items:s.app.items}), {initCategories, initItems})(AdminItems);
