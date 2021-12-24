import React from 'react';
import {Link} from 'react-router-dom';

function Four0Four() {
    return (<div className="relative overflow-hidden bg-white dark:bg-gray-900 flex-grow">
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex py-32 xl:py-40">
            <h1 className="drop-shadow-lg text-4xl font-extrabold tracking-tight text-green-600 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl animate-bounce">
            404 | Page Not Found...
            <br/>
            <small style={{fontSize:20}} className="text-gray-700">Go back <Link to="/">Home</Link></small>
            </h1>
        </div>
    </div>
    )
}

export default Four0Four
