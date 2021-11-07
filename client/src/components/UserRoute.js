import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

/**
 * @param {import('react-router').RouteProps} props 
 */
const UserRoute = ({user,loading, ...props}) => 
    (user._id === null && !loading) ? <Redirect to="/login"/> :
    loading ? null : <Route {...props}/>

export default connect(s=>({user:s.user,loading:s.app.isLoading}))(UserRoute);
