import React from 'react';

function Confirm({txt, onClick}) {
    return (<div className="bg-indigo-900 text-center py-4 lg:px-4 popup">
    <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        !
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">
        {txt}
      </span>
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        <i className="fas fa-thumbs-up cursor-pointer" onClick={()=>onClick(true)}></i>
      </span>
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        <i className="fas fa-thumbs-down cursor-pointer" onClick={()=>onClick(false)}></i>
      </span>
    </div>
  </div>)
}

export default Confirm;
