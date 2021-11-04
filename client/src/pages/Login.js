import { connect } from 'react-redux';
import React, { useState} from 'react';
import { login } from '../redux/actions';
import { Redirect } from 'react-router';

function Login({login, user}) {
    const [isLogin, setIsLogin] = useState(true);

    const onSubmit = e => {
        e.preventDefault();
        let fd = new FormData(e.target);
        let obj = {}; fd.forEach((v, k)=>obj[k]=v);

        if(isLogin){
            login(obj.email, obj.password);
        } else {

        }
    }
    if(user._id)
        return <Redirect to="/"/>

    return isLogin ? (<section className="w-full px-2 py-20 bg-gray-100 xl:px-8">
        <div className="max-w-5xl mx-auto py-16">
            <div className="grid" style={{placeItems:'center'}}>
                
                <div className="w-full mt-16 md:mt-0 md:w-2/5">
                    <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                        <form onSubmit={onSubmit}>
                            <h3 className="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
                            <input type="text" name="email" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-green-500 focus:outline-none" placeholder="Email address"/>
                            <input type="password" name="password" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-green-500 focus:outline-none" placeholder="Password"/>
                            <div className="block">
                                <button 
                                    className="w-full px-3 py-4 font-medium text-white bg-green-600 rounded-lg"
                                    type="submit"
                                >
                                    Log Me In
                                </button>
                            </div>
                            <p className="w-full mt-4 text-sm text-center text-gray-500">
                                Don't have an account? <b className="text-green-500 underline cursor-pointer" onClick={()=>setIsLogin(false)}>Sign up here</b>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>) : (<div className="py-20 bg-white container max-w-6xl mx-auto grid justify-center px-2"> 
            <form className="w-full max-w-lg bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl p-8 py-10">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <h3 className="mb-6 text-2xl font-medium text-center">Sign Up</h3>
                    </div>
                </div>
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
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input 
                            required  id="password"
                            name="password" type="password"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">
                        Street
                        </label>
                        <input 
                            required name="street" 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="street" type="text"
                        />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        City
                        </label>
                        <input required name="city" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                    </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    State
                    </label>
                    <input required name="state" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"/>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                    Zip
                    </label>
                    <input required name="zip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"/>
                </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                    <button 
                        className="w-full px-6 py-3 mt-3 text-lg text-white bg-green-600 rounded-md sm:mb-0 hover:bg-green-700"
                    >
                        Sign Up
                    </button>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <p className="w-full mt-4 text-sm text-center text-gray-500">
                            Already have an account? <b className="text-green-500 underline cursor-pointer" onClick={()=>setIsLogin(true)}>Sign in</b>
                        </p>
                    </div>
                </div>
            </form>
        </div>);
}

export default connect(s=>({user:s.user}), {login})(Login)
