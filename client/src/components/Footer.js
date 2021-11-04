import React from 'react';
import {Link} from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

function Footer() {
    return (<section className="text-gray-700 bg-white body-font dark:bg-gray-800">
        <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
            <Link to="/" className="text-xl font-black leading-none text-gray-900 dark:text-white select-none logo">
                sukkotMe<span className="text-green-600">.</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-200 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">
                &copy; 2019 - {new Date().getFullYear()} YudiKahn
            </p>

            <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
                
                <ToggleTheme/>
                <a href="https://wa.me/+18186052066" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Whatsapp</span>
                    <i className="fab fa-whatsapp"></i>
                </a>

                <a href="https://maps.google.com/maps?q=18253+Topham+St+Tarazana+CA+91335" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Map</span>
                    <i className="fas fa-map-marker-alt"></i>
                </a>

                <a href="sms:+18186052066" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Chat</span>
                    <i className="fas fa-comments"></i>
                </a>

                <a href="tel:+18186052066" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Phone</span>
                    <i className="fas fa-phone"></i>
                </a>

                <a href="mailto:sukkotme@gmail.com" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Gmail</span>
                    <i className="fas fa-envelope"></i>
                </a>
            </span>
        </div>
    </section>)
}

export default Footer
