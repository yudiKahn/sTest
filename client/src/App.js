import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { UserRoute, Navbar, Footer, Spinner, Popup, Alerts } from './components';
import { Login, Landing, Four0Four, Todos, Gallery, User, UserOrders,
     UserOrder, Admin, AdminOrders, AdminUsers, AdminEmail, AdminItems,
     AdminCategories, Shop, UserCart, ShopItem, Profile } from './pages';
import { getUserFromToken } from './redux/actions';
import store from './redux/store';

function App() {   
    store.dispatch(getUserFromToken());
    useEffect(()=>{
      document.querySelector('.loader').classList.add('loader--hide');
    },[]);

    return (<Provider store={store}>
    <BrowserRouter>
      <Spinner/>
      <Popup/>
      <Alerts/>
      <div className="flex flex-col h-screen">
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/gallery" component={Gallery}/>
            <UserRoute exact path="/user" component={User}/>
            <UserRoute exact path="/user/orders" component={UserOrders}/>
            <UserRoute exact path="/user/cart" component={UserCart}/>
            <UserRoute exact path="/user/profile" component={Profile}/>
            <UserRoute exact path="/user/orders/:uid" component={UserOrder}/>
            <UserRoute exact path="/admin" component={Admin}/>
            <UserRoute exact path="/admin/users" component={AdminUsers}/>
            <UserRoute exact path="/admin/orders" component={AdminOrders}/>
            <UserRoute exact path="/admin/email" component={AdminEmail}/>
            <UserRoute exact path="/admin/items" component={AdminItems}/>
            <UserRoute exact path="/admin/todo" component={Todos}/>
            <UserRoute exact path="/admin/items/categories" component={AdminCategories}/>
            <UserRoute exact path="/shop/:category" component={Shop}/>
            <UserRoute exact path="/shop/item/:id" component={ShopItem}/>
            <Route component={Four0Four}/>
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  </Provider>)
}

export default App;