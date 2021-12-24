import React from 'react'
import { Link } from 'react-router-dom';

function Card({icon, title, txt, onClick, link}) {

    const content = (<>
    <div className="p-3 text-white w-14 h-14 bg-green-500 rounded-full grid place-content-center">
        {icon}
    </div>
    <h4 className="text-xl font-medium text-gray-700">{title}</h4>
    <p className="text-base text-center text-gray-500">{txt}{txt&&"."}</p>
    </>);

    return link ? <Link to={link} className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl  sm:rounded-xl">
        {content}
    </Link> : <div onClick={onClick} className="cursor-pointer relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl  sm:rounded-xl">
        {content}
    </div>;
}

export default Card
