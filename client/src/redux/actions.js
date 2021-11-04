import axios from 'axios';
import store from './store';
import React from 'react';
import {Confirm} from '../components';
import * as TYPES from './types';

//#region app
export const setLoading = (flag) => ({
    type:TYPES.SET_LOADING,
    payload:flag
});

export const initItems = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        if(store.getState().app.items.length < 1){
            let resp = await axios.get('/api/items');
            dispatch({
                type: TYPES.INIT_ITEMS,
                payload: resp.data
            });
        }
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    }   
}

export const initCategories = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        if(store.getState().app.categories.length < 1){
            let resp = await axios.get('/api/categories');
            dispatch({
                type: TYPES.INIT_CATEGORIES,
                payload: resp.data
            });
        }
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    }   
}

export const addCategory = (txt) => async dispatch => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.post('/api/categories', {category:txt});
        dispatch({
            type: TYPES.INIT_CATEGORIES,
            payload: resp.data
        });
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    }   
}

export const setPopup = (element) => ({
    type: TYPES.SET_POPUP,
    payload: element
});
//#endregion

//#region todos
export const initTodos = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.get('/api/todos')
        dispatch({
            type:TYPES.INIT_TODOS,
            payload:resp.data
        })
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    } 
}
export const addTodo = (txt) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.post('/api/todos', {txt})
        dispatch({
            type:TYPES.INIT_TODOS,
            payload:resp.data
        })
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    } 
}
export const delTodo = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.delete('/api/todos/'+id)
        dispatch({
            type:TYPES.INIT_TODOS,
            payload:resp.data
        })
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    } 
} 
export const putTodo = (id, val) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.put('/api/todos/'+id, {val})
        dispatch({
            type:TYPES.INIT_TODOS,
            payload:resp.data
        })
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    } 
}
//#endregion

//#region user
export const login = (email, password) => async dispatch => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.post('/api/user/login', {email, password})
        localStorage.setItem('token', resp.data.token);
        dispatch({
            type:TYPES.SET_USER,
            payload:resp.data
        });
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    } 
}
export const getUserFromToken = () => async dispatch => {
    dispatch({
        type:TYPES.SET_LOADING,
        payload:true
    });
    try {
        if(localStorage.getItem('token')){
            let resp = await axios.post(`/api/user/token/${localStorage.getItem('token')}`);
            dispatch({
                type:TYPES.SET_USER,
                payload:resp.data
            });
        }
    } catch (err) {

    } finally {
        dispatch(setLoading(false));
    }   
}
export const logout = () => {
    localStorage.removeItem('token');
    return {
        type:TYPES.SET_USER,
        payload:{_id:null}
    }
};

export const initOrders = (userId, toFetch = true) => async dispatch => {
    dispatch(setLoading(true));
    try {
        if(toFetch){
            let resp = await axios.get(`/api/orders/${userId}`);
            dispatch({
                type:TYPES.SET_USER_ORDERS,
                payload:resp.data
            });
        }
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    } 
}
export const initCart =  () => async dispatch => {
    dispatch(setLoading(true));
    try {
        let {cart, _id} = store.getState().user;
        if(cart.items.length < 1){
            if(!_id) throw new Error("No user id");
            let resp = await axios.get(`/api/cart/${_id}`);
            dispatch({
                type:TYPES.INIT_USER_CART,
                payload:resp.data.cart
            })
        }
    } catch (err) {

    } finally {
        dispatch(setLoading(false));
    } 
}
export const removeFromCart = (cid, itemId) => async dispatch => {
    dispatch(setLoading(true));
    try {
        dispatch({
            type:TYPES.SET_POPUP,
            payload: () => <Confirm txt="Are you sure ?" onClick={async (didSubmit)=>{
                dispatch(setLoading(true));
                try{
                    dispatch({
                        type:TYPES.SET_POPUP,
                        payload:null
                    });
                    if(didSubmit){
                        let resp = await axios.delete(`/api/cart/${cid}/${itemId}`);
                        dispatch({
                            type:TYPES.INIT_USER_CART,
                            payload:resp.data
                        });
                    }
                }catch(er){

                }finally{
                    dispatch(setLoading(false));
                }
            }}/>
        })
    } catch (error) {
        
    } finally {
        dispatch(setLoading(false));
    }
}
export const addToCart = (item) => async dispatch => {
    dispatch(setLoading(true));
    try {
        let uid = store.getState().user._id;
        if(!uid || !item) throw new Error('Error. no paramaters')
        let resp = await axios.post('/api/cart', {uid, item});
        dispatch({
            type:TYPES.INIT_USER_CART,
            payload:resp.data
        });
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    } 
}
//#endregion


//#region admin
export const initAdminUsers = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.get('/api/user/all');
        const users = resp.data.sort((a,b)=> a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0);
        dispatch({
            type: TYPES.INIT_ADMIN_USERS,
            payload: users
        });
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    }   
}
export const initAdminOrders = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        let resp = await axios.get('/api/orders');
        dispatch({
            type: TYPES.INIT_ADMIN_ORDERS,
            payload: resp.data
        });
    } catch (err) {
        
    } finally {
        dispatch(setLoading(false));
    }   
}
//#endregion

//#region  template
// dispatch(setLoading(true));
// try {
//     
// } catch (err) {
    
// } finally {
//     dispatch(setLoading(false));
// } 
//#endregion