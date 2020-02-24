import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from './components/App';
import Main from './components/Main';

function routeContact(s, cb) {
	System.import('./components/Contact').then(component => {
		cb(null, component.default || component);
	});
}

function routeAccount(s, cb) {
	System.import('./components/Account').then(component => {
		cb(null, component.default || component);
	});
}

function routeLogin(s, cb) {
	System.import('./components/Login').then(component => {
		cb(null, component.default || component);
	});
}

function routeRegister(s, cb) {
	System.import('./components/Register').then(component => {
		cb(null, component.default || component);
	});
}

function routeForgot(s, cb) {
	System.import('./components/Forgot').then(component => {
		cb(null, component.default || component);
	});
}

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Main}/>
		<Route path="contact" getComponent={routeContact}/>
		<Route path="account" getComponent={routeAccount}/>
		<Route path="login" getComponent={routeLogin}/>
		<Route path="register" getComponent={routeRegister}/>
		<Route path="forgot" getComponent={routeForgot}/>
	</Route>
);
