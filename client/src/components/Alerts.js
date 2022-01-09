import { connect } from 'react-redux';
import React from 'react';
import {setAlerts} from '../redux/actions';

function Alerts({alerts, setAlerts}) {
    const getColor = (type) => type === "info" ? "indigo" : type === "error" ? "pink" : "yellow"
    return alerts?.length > 0 && (<div className="alerts">
    <div className="bg-white mb-2">
        <i className="fas fa-times cursor-pointer fa-2x m-3" onClick={()=>setAlerts(null)}></i>
    </div>
    {
        alerts?.map((v,i)=> <div key={i} className={`bg-${getColor(v.type)}-200 border-t-4 border-${getColor(v.type)}-300 rounded-b mb-2 px-4 py-3 shadow-md mr-auto sm:mx-auto w-5/6 xs:w-2/3 sm:w-1/3`} role="alert">
        <div className="flex truncate">
            <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div className="self-center">
                <p className="text-sm">{v.msg}</p>
            </div>
        </div>
        </div>)
    }
    </div>);
};

export default connect(s=>({alerts:s.app.alerts}), {setAlerts})(Alerts);
