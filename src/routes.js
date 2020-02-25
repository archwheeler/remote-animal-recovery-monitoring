import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from './components/App';
import Main from './components/Main2';

function routeUsers(s, cb) {
	System.import('./components/Users').then(component => {
		cb(null, component.default || component);
	});
}

function routeContact(s, cb) {
	System.import('./components/Contact').then(component => {
		cb(null, component.default || component);
	});
}

function routeLoadForm(s, cb) {
	System.import('./components/LoadForm').then(component => {
		cb(null, component.default || component);
	});
}

function routeAccount(s, cb) {
	System.import('./components/Account').then(component => {
		cb(null, component.default || component);
	});
}

function routeSurvey(s, cb) {
	System.import('./components/Survey').then(component => {
		cb(null, component.default || component);
	});
}
function routeChat(s, cb) {
	System.import('./components/Chat').then(component => {
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

function routeVetMain(s, cb) {
	System.import('./components/VetMain').then(component => {
		cb(null, component.default || component);
	});
}

function routeVetInformationInput(s, cb) {
	System.import('./components/VetInformationInput').then(component => {
		cb(null, component.default || component);
	});
}

function routeVetNewSurvey(s, cb) {
	System.import('./components/VetNewSurvey').then(component => {
		cb(null, component.default || component);
	});
}


export default (
	<Route path="/" component={App}>
		<IndexRoute component={Main}/>
		<Route path="users" getComponent={routeUsers}/>
		<Route path="users/:id" getComponent={routeUsers}/>
		<Route path="contact" getComponent={routeContact}/>
		<Route path="loadform" getComponent={routeLoadForm}/>
		<Route path="survey" getComponent={routeSurvey}/>
		<Route path="chat" getComponent={routeChat}/>
		<Route path="account" getComponent={routeAccount}/>
		<Route path="login" getComponent={routeLogin}/>
		<Route path="register" getComponent={routeRegister}/>
		<Route path="vetmain" getComponent={routeVetMain}/>
		<Route path="vetnewsurvey" getComponent={routeVetNewSurvey}/>
		<Route path="vetinformationinput" getComponent={routeVetInformationInput}/>
	</Route>
);
