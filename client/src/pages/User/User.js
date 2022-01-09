import React from 'react';
import { connect } from 'react-redux';
import {Card} from '../../components';
import { logout} from '../../redux/actions';
import {getGreeting} from '../../utils';

function User({user, logout}) {
    return user._id && (<section className="py-20 bg-white dark:bg-gray-800">
        <div className="container max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-center dark:text-gray-200">{getGreeting()} {user.firstName}</h2>
            <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-300">Check out your list of actions below.</p>
            <div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                <Card
                    icon={<i style={{display:'grid',fontSize:20}} className="fas fa-chart-bar w-8 h-8 place-content-center"></i>}
                    title="Orders"
                    txt="Each of our plan will provide you and your team with certifications"
                    link="/user/orders"
                />
                <Card
                    icon={<i style={{display:'grid',fontSize:20}} className="fas fa-shopping-cart w-8 h-8 place-content-center"></i>}
                    title="Cart"
                    txt="Each of our plan will provide you and your team with certifications"
                    link="/user/cart"
                />
                <Card
                    icon={<i style={{display:'grid',fontSize:20}} className="fas fa-store-alt w-8 h-8 place-content-center"></i>}
                    title="Shopping"
                    txt="Each of our plan will provide you and your team with certifications"
                    link="/shop/all"
                />
                <Card
                    icon={<i style={{display:'grid',fontSize:20}} className="fas fa-user w-8 h-8 place-content-center"></i>}
                    title="Profile"
                    txt="Each of our plan will provide you and your team with certifications"
                    link="/user/profile"
                />
                <Card
                    icon={<i style={{display:'grid',fontSize:20}} className="fas fa-sign-out-alt w-8 h-8 place-content-center"></i>}
                    title="Logout"
                    txt="Each of our plan will provide you and your team with certifications"
                    onClick={logout}
                />
            </div>
        </div>
    </section>)
}

export default connect(s=>({user:s.user}), {logout})(User)