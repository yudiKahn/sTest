import React, { useEffect, useRef, useState } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart, initItems} from '../redux/actions';
import Four0Four from './404';

function ShopItem({items, addToCart, initItems}) {
    const [item,setItem] = useState(null);
    const id = useParams().id;
    const init = useRef(()=>{});
    init.current = () => {
        if(items.length === 0){
            initItems();
        } else {
            setItem(items.find(v => v._id === id));
        }
    };

    useEffect(()=>{
        init.current();
    },[items]);
    
    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        let fd = new FormData(e.target);
        addToCart({
            price:     parseInt(fd.get('price').split('~')[0]),
            priceType: fd.get('price').split('~')[1],
            option:    fd.get('option'),
            name:      item.name,
            category:  item.category,
            q:         parseInt(fd.get('q'))
        });
        history.push("/user/cart")
    }

    return item ? (<section className="w-full px-2 py-20 bg-gray-100 xl:px-8 flex-grow dark:bg-gray-700">
        <div className="max-w-5xl mx-auto py-16">
            <div className="grid" style={{placeItems:'center'}}>
                
                <div className="w-full mt-16 md:mt-0 md:w-2/5">
                    <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-900 rounded-lg shadow-2xl px-7">
                        <form onSubmit={onSubmit}>
                            <h3 className="mb-6 text-2xl font-medium dark:text-gray-300">{item.category} - {item.name}</h3>

                            <select required name="price" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-green-500 focus:outline-none">
                            {
                                item.prices.map((v,i)=> <option key={i} value={`${v}~${item.pricesTypes[i]}`}>
                                    ${v.toFixed(2)} {item.pricesTypes[i] && ` - ${item.pricesTypes[i]}`}
                                </option>)
                            }
                            </select>
                            {
                                item.options[0] &&
                                <select required name="option" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-green-500 focus:outline-none">
                                {
                                    item.options.map((v,i)=> <option key={i} value={v}>{v}</option>)
                                }
                                </select>
                            }
                            <input required type="number" name="q" min="0" placeholder="Qty"
                                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-green-500 focus:outline-none"/>
                            <div className="block">
                                <button 
                                    className="w-full px-3 py-4 font-medium text-white bg-green-600 rounded-lg"
                                    type="submit"
                                >
                                    Add To Cart
                                </button>
                                <Link to="/shop/all"
                                    className="w-full px-3 font-medium text-gray-600 dark:text-gray-400"
                                >
                                    <i className="fas fa-arrow-left text-gray-600 dark:text-gray-400"></i> Go Back Shopping
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>) : <Four0Four/>
}

export default connect(s=>({items:s.app.items}), {addToCart, initItems})(ShopItem)
