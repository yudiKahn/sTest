import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import {initCategories, addCategory} from '../../redux/actions'

function AdminCategories({categories, initCategories, addCategory}) {
    const ref= useRef(()=>{});
    ref.current = () => initCategories();

    useEffect(()=>{
        ref.current();
    },[]);
    const [txt, setTxt] = useState("");

    return (<div className="bg-white h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
                <h1 className="text-grey-darkest">Categories</h1>
                <div className="flex mt-4">
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                        placeholder="Add Category"
                        value={txt}
                        onChange={e=>setTxt(e.target.value)}/>
                    <button 
                        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                        onClick={()=>{
                            addCategory(txt);
                            setTxt("");
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
            <div>
                {
                    categories.map((v,i)=><div key={i} className="flex mb-4 items-center">
                        <p className="w-full text-grey-darkest">{v}</p>
                        <button 
                            className="bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"  
                        >
                            Remove
                        </button>
                    </div>)
                }
            </div>
        </div>
    </div>)
}

export default connect(s=>({categories:s.app.categories}), {initCategories, addCategory})(AdminCategories);
