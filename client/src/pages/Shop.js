import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {initItems} from '../redux/actions';
import {Shop as _Shop} from '../utils';

function Shop({items, initItems}) {
    const category = useParams().category.toLowerCase();
    const ref = useRef(()=>{});
    ref.current = () => initItems();
    useEffect(()=>{
        ref.current();
    },[]);

    return (<div className="antialiased bg-gray-200 dark:bg-gray-800 text-gray-900 font-sans p-6 flex-grow">
        <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
            {
                items.map((v,i)=> (category === "all" || category===v.category.toLowerCase()) && (<div key={i} className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4">
                    <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="relative pb-48 overflow-hidden">
                            <img className="absolute inset-0 h-full w-full object-contain" src="/imgs/logo.png" alt="logo"/>
                        </div>
                        <div className="p-3 items-center text-sm text-gray-600">
                            <h5 className="font-bold">{v.name}</h5>
                            <p className="my-1">{_Shop.showPrices(v.prices)}</p>
                            <Link to={`/shop/item/${v._id}`} className="font-medium bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">
                               Add To Cart
                            </Link>
                        </div>
                    </div>
                </div>))
            }
            </div>
        </div>
    </div>)
}

export default connect(s=>({items:s.app.items}), {initItems})(Shop)
