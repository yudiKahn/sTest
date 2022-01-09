import { combineReducers } from "redux";
import * as TYPES from './types';

const userInitState = {
    _id:null,
    orders:[],
    cart:{
        items:[]
    },
}

function userReducer(state = userInitState, action){
    const {type, payload} = action;
    switch(type){
        case TYPES.SET_USER:
            if(payload._id === null) localStorage.removeItem('token');
            return {...state, ...payload};
        case TYPES.INIT_USER_CART:
            return {...state, cart:payload};
        case TYPES.SET_USER_ORDERS:
            return {...state, orders:payload};
        default: return state;
    }
}

function todosReducer(state = [], {type, payload}){
    switch(type){
        case TYPES.INIT_TODOS:
            return payload;
        default: return state;
    }
}

const appInitState = {
    isLoading:false, 
    items:[],
    categories:[],
    popup: null,
    alerts:[]
}

function appReducer(state = appInitState, {type, payload}){
    switch(type){
        case TYPES.SET_POPUP:
            return {...state, popup: payload};
        case TYPES.INIT_CATEGORIES:
            return {...state, categories: payload};
        case TYPES.INIT_ITEMS:
            return {...state, items:payload};
        case TYPES.SET_LOADING:
            return {...state, isLoading:payload};
        case TYPES.SET_ALERTS:
            return {...state, alerts: payload};
        default: return state;
    }
}

const adminInitState = {
    orders:[],
    users:[],
}

function adminReducer(state = adminInitState, {type, payload}){
    switch(type){
        case TYPES.INIT_ADMIN_USERS:
            return {...state, users:payload};
        case TYPES.INIT_ADMIN_ORDERS:
            return {...state, orders:payload}
        default: return state;
    }
}

const rootReducer = combineReducers({
    user:  userReducer,
    todos: todosReducer,
    app:   appReducer,
    admin: adminReducer,
});

export default rootReducer;