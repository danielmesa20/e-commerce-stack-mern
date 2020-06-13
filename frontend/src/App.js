import React, { Component } from 'react';
//CSS Import
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-confirm-alert/src/react-confirm-alert.css';
//Navbar Component
import Navigation from './components/navigation/Navigation';
//Navigation
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Products Components
import CreateProduct from './components/products/CreateProduct';
import ListProducts from './components/products/ListProducts';
import UpdateProduct from './components/products/UpdateProduct';
import ProfileProduct from './components/products/ProductProfile';
//Auth Components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store} >
        <Router>
          <Navigation />
          <div className="container p-4">
            <Route path="/" exact component={ListProducts} />
            <Route path="/create" component={CreateProduct} />
            <Route path="/edit/:idProduct" component={UpdateProduct}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile/:idProduct" component={ProfileProduct} />
            <Route path="/userProducts/:idUser" component={ListProducts} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
