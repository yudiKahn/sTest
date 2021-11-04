import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

/**
 * @param {import('react-router').RouteProps} props 
 */
const UserRoute = ({user, ...props}) => (user._id === null && !localStorage.getItem('token')) ? <Redirect to="/login"/> : <Route {...props}/>

export default connect(s=>({user:s.user}))(UserRoute);
