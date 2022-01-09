import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {Card} from '../../components';
import {initAdminUsers, initAdminOrders} from '../../redux/actions';

function AdminEmail({admin:{users, orders}, initAdminUsers, initAdminOrders}) {
    const ref = useRef(()=>{});
    ref.current = () => {
        if(users && users.length < 1) initAdminUsers();    
        if(orders && orders.length < 1) initAdminOrders();
    }
    useEffect(()=>{
        ref.current();
    },[])

    const [state, setState] = useState({
        type:null,
        user:null,
        selectedUser:null,
        toCreateNewOrder:null
    });
    const {type, user, selectedUser} = state;

    const onNewUserSubmit = e => {
        e.preventDefault();
        let isAdrs = /(state|city|street|zip)/ig;
        let obj = {address:{}}; 
        new FormData(e.target).forEach((v,k)=> isAdrs.test(k) ? obj['address'][k] = v : obj[k] = v);
        setState({...state,selectedUser:obj})
    }
    //phase #1. invoice | text
    if(!type && !user) 
        return (<section className="py-20 bg-white">
            <div className="container max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                    <Card
                        icon={<i className="fas fa-file-invoice-dollar fa-2x"></i>}
                        title="Invoice"
                        txt="Each of our plan will provide you and your team with certifications."
                        onClick={()=>setState({...state,type:"invoice"})}
                    />
                    <Card
                        icon={<i className="fas fa-file-word fa-2x"></i>}
                        title="Text"
                        txt="Each of our plan will provide you and your team with certifications."
                        onClick={()=>setState({...state,type:"text"})}
                    />
                </div>
            </div>
        </section>);

    //phase #2. old user | new user
    else if(type && !user)
        return(<section className="py-20 bg-white">
            <div className="container max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                    <Card
                        icon={<i className="fas fa-user-plus fa-2x"></i>}
                        title="New User"
                        txt="Each of our plan will provide you and your team with certifications."
                        onClick={()=>setState({...state,user:"new"})}
                    />
                    <Card
                        icon={<i className="fas fa-users fa-2x"></i>}
                        title="User from our registerd users"
                        txt="Each of our plan will provide you and your team with certifications."
                        onClick={()=>setState({...state,user:"old"})}
                    />
                </div>
            </div>
        </section>);
    
    //phase #3. select user (from db | new)
    else if(type && user && !selectedUser){
        if(user === "old"){
            return (<section className="py-20 bg-white">
            <div className="container max-w-6xl mx-auto grid justify-center">          
                <div className="grid grid-rows-1 grid-flow-col gap-4">
                    <select 
                        className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        onChange={e=>setState({...state, selectedUser:JSON.parse(e.target.value)})}
                    >
                        <option value="">
                            Select a user
                        </option>
                        {
                            users.map((v,i)=><option key={i} value={JSON.stringify(v)}>
                                {v.firstName} {v.lastName} - {v.email}
                            </option>)
                        }
                    </select>
                    <button 
                        className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-green-600 rounded-md sm:mb-0 hover:bg-green-700 sm:w-auto"
                    >
                        Next&nbsp; <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
            </section>)
        } else {
            return (<div className="py-20 bg-white container max-w-6xl mx-auto grid justify-center"> 
                <form className="w-full max-w-lg" onSubmit={onNewUserSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        First Name
                        </label>
                        <input required name="firstName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Last Name
                        </label>
                        <input required name="lastName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Email
                        </label>
                        <input required name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email"/>
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        City
                        </label>
                        <input required name="city" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        State
                        </label>
                        <input required name="state" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"/>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Zip
                        </label>
                        <input required name="zip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"/>
                    </div>
                    </div>
                    <button 
                        className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-green-600 rounded-md sm:mb-0 hover:bg-green-700 sm:w-auto"
                    >
                        Next&nbsp; <i className="fas fa-arrow-right"></i>
                    </button>
                </form>
            </div>);
        }
    }

    //phase #4. if old user choose & invoice, select old order | new order
    else if(type === "invoice" && user === "old" && selectedUser)
        return (<section className="py-20 bg-white">
            <div className="container max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                    <Card
                        icon={<i className="fas fa-file-edit fa-2x"></i>}
                        title="New Order"
                        txt="You selected a registerd user. Do you want to create for him a new order for invoice ?"
                        onClick={()=>setState({...state,toCreateNewOrder:true})}
                    />
                    <Card
                        icon={<i className="fas fa-database fa-2x"></i>}
                        title="Old Order"
                        txt="You selected a registerd user. Click here to select an old order"
                        onClick={()=>setState({...state,toCreateNewOrder:false})}
                    />
                </div>
            </div>
        </section>)
    
    else return null;
}

export default connect(s=>({admin:s.admin}), {initAdminUsers, initAdminOrders})(AdminEmail)
