import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (<section className="text-gray-700 bg-white body-font">
        <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
            <Link to="/" className="text-xl font-black leading-none text-gray-900 select-none logo">sukkotMe<span className="text-green-600">.</span></Link>
            <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">&copy; 2019 - {new Date().getFullYear()} YudiKahn
            </p>
            <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
                <span className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Whatsapp</span>
                    <i className="fab fa-whatsapp"></i>
                </span>

                <span className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Map</span>
                    <i className="fas fa-map-marker-alt"></i>
                </span>

                <span className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Chat</span>
                    <i className="fas fa-comments"></i>
                </span>

                <a href="tel:+972559991015" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Phone</span>
                    <i className="fas fa-phone"></i>
                </a>
            </span>
        </div>
    </section>)
}

export default Footer
