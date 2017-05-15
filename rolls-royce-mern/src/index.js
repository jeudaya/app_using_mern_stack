import React, { Component } from 'react';
import { render } from 'react-dom';
import {Router, Route,browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux' ;
import store from './store';
import App from './App';
import Login from './components/login';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';

render(
<Provider store={store}>

        <Router history={browserHistory}>
            <Route path="/" component={Login} ></Route>

            <Route path="/login" component={Login}></Route>

            
        </Router>
    </Provider>, 
    document.getElementById('root')
)

