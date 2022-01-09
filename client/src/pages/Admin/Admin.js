import React from 'react';
import {getGreeting} from '../../utils';
import {Card} from '../../components';
import {logout} from '../../redux/actions';
import {connect} from 'react-redux'

function Admin({logout}) {
    return (<section className="py-20 bg-white dark:bg-gray-800">
    <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight text-center dark:text-gray-200">{getGreeting()} Admin</h2>
        <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-300">Check out our list of awesome features below.</p>
        <div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
            <Card
                icon={<i style={{display:'grid',fontSize:20}} className="fas fa-users w-8 h-8 place-content-center"></i>}
                title="All Users"
                txt="Each of our plan will provide you and your team with certifications"
                link="/admin/users"
            />
            <Card
                icon={<i style={{display:'grid',fontSize:20}} className="fas fa-chart-bar w-8 h-8 place-content-center"></i>}
                title="All Orders"
                txt="Each of our plan will provide you and your team with certifications"
                link="/admin/orders"
            />
            <Card
                icon={<i style={{display:'grid',fontSize:20}} className="fas fa-envelope w-8 h-8 place-content-center"></i>}
                title="Send Email"
                txt="Each of our plan will provide you and your team with certifications"
                link="/admin/email"
            />
            <Card
                icon={<i style={{display:'grid',fontSize:20}} className="fas fa-shopping-basket w-8 h-8 place-content-center"></i>}
                title="Items"
                txt="Each of our plan will provide you and your team with certifications"
                link="/admin/items"
            />
            <Card
                icon={<i style={{display:'grid',fontSize:20}} className="fas fa-wrench w-8 h-8 place-content-center"></i>}
                title="Todo"
                txt="Each of our plan will provide you and your team with certifications"
                link="/admin/todo"
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

export default connect(null, {logout})(Admin)
