import React, { useEffect, useRef, useState } from 'react';
import {initTodos, addTodo, putTodo, delTodo} from '../redux/actions';
import {connect} from 'react-redux';

function Todos({todos, initTodos, addTodo, delTodo, putTodo}) {
    const [txt, setTxt] = useState('');
    const ref = useRef(()=>{});
    ref.current = () => initTodos();
    useEffect(()=>{
        ref.current();
    },[]);
   

    return (<div className="bg-white h-100 w-full flex items-center justify-center bg-teal-lightest font-sans flex-grow">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                    placeholder="Add Todo"
                    value={txt}
                    onChange={e=>setTxt(e.target.value)}/>
                <button 
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    onClick={()=>{
                        addTodo(txt);
                        setTxt("");
                    }}
                >
                    Add
                </button>
            </div>
        </div>
        <div>
            {
                todos.map((v,i)=><div key={i} className="flex mb-4 items-center">
                    <p className={`w-full text-grey-darkest ${v.isDone ? 'line-through':''}`}>{v.txt}</p>
                    <button 
                        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                        onClick={()=>putTodo(v.id, {...v, isDone:!v.isDone})}
                    >
                        {v.isDone ? 'x':'v'}
                    </button>&nbsp;
                    <button 
                        className="bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                        onClick={()=>delTodo(v.id)}    
                    >
                        Remove
                    </button>
                </div>)
            }
        </div>
    </div>
</div>)
}

export default connect(s=>({todos:s.todos}), {initTodos, addTodo, delTodo, putTodo})(Todos);
