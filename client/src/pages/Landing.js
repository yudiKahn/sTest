import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Card} from '../components';
import {initCategories} from '../redux/actions';

function Landing({categories, initCategories}) {
    const ref = useRef(()=>{});
    ref.current = () =>  initCategories();
    useEffect(()=>{
       ref.current();
    },[]);

    return (<>
        <section className="px-2 py-32 bg-white dark:bg-gray-800 md:px-0">
            <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                <div className="flex flex-wrap items-center sm:-mx-3">
                    <div className="w-full md:w-1/2 md:px-3">
                        <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                <span className="block xl:inline">All Your Sukkot Needs&nbsp;</span>
                                <span className="block text-green-600 xl:inline">In One Place!</span>
                            </h1>
                            <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                                It's never been easier to get your 4 minim {'&'} your sukkot needs, All in one place.
                            </p>
                            <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                <a href="#shopping" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-green-600 rounded-md sm:mb-0 hover:bg-green-700 sm:w-auto">
                                    Start Shopping&nbsp;<i className="fas fa-arrow-down"></i>
                                </a>
                                <Link to="/gallery" className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                    Gallery
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                            <img src="/imgs/field.jpg" alt="field"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800" id="shopping">
            <div className="container max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight text-center dark:text-gray-200">Shop</h2>
                <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-300">Check out our list of categories below.</p>
                <div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                    {
                        categories.map((v,i)=> <Card 
                            key={i}
                            icon={<i className="far fa-lemon fa-2x"></i>}
                            title={v}
                            txt={`See all products under '${v}' category`}
                            link={`/shop/${v}`}
                        />)
                    }
                </div>
            </div>
        </section>

        <section className="flex items-center justify-center py-20 bg-white dark:bg-gray-800 min-w-screen">
            <div className="px-16">
                <div className="container flex flex-col items-start mx-auto lg:items-center">

                    <h2 className="dark:text-gray-300 relative flex items-start justify-start w-full max-w-3xl text-5xl font-bold lg:justify-center">                  
                        Quotes
                    </h2>
                    <div className="block w-full h-0.5 max-w-lg mt-6 bg-green-100 rounded-full"></div>

                    <div className="items-center justify-center w-full mt-12 mb-4 lg:flex">
                        <div className="w-full mt-12 mb-4 lg:flex">
                            <div className="flex flex-col items-start justify-start w-full h-auto lg:w-2/3">
                                <blockquote className="text-lg text-gray-500 dark:text-gray-200">
                                    "Rabbi Schneur Zalman of Liadi taught that when G‑d told Moses that
                                    the Jews should take an etrog, He sent messengers to gather them in Calabria. 
                                    Thus, even as Napoleon wreaked havoc on Europe during his wars of conquest,
                                    Rabbi Schneur Zalman sent a messenger to retrieve for him a Calabria citron from Italy."
                                </blockquote>
                            </div>
                        </div>

                        <div className="w-full mt-12 mb-4 lg:flex">
                            <div className="flex flex-col items-start justify-start w-full h-auto lg:w-2/3">
                                <blockquote className="text-lg text-gray-500 dark:text-gray-200">
                                    "When World War I broke out, a Chassid named Avraham Erlanger, living in Switzerland,
                                    received a telegram from the fifth Rebbe asking that he arrange a Calabria etrog.
                                    Against huge odds, Erlanger managed to obtain a number of Calabria etrogim,
                                    which he sent with a messenger all the way to Lubavitch, arriving just in time for the holiday."
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default connect(s=>({categories:s.app.categories}), {initCategories})(Landing);