import React from 'react';
import {connect} from 'react-redux';

const Spinner = ({loading}) => loading ? <div className="flex justify-center items-center spinner">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-700"></div>
  </div>:null;

export default connect(s=>({loading:s.app.isLoading}))(Spinner)
