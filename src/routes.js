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

function routeQuestionnares(s, cb) {
	System.import('./components/Questionnares').then(component => {
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

function routeVetNewAnimal(s, cb) {
	System.import('./components/VetNewAnimal').then(component => {
		cb(null, component.default || component);
	});
}

function routeVetNewSurvey(s, cb) {
	System.import('./components/VetNewSurvey').then(component => {
		cb(null, component.default || component);
	});
}


function routeForgot(s, cb) {
	System.import('./components/Forgot').then(component => {
		cb(null, component.default || component);
	});
}

function routeVetChat(s, cb) {
	System.import('./components/VetChat').then(component => {
		cb(null, component.default || component);
	});
}

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Main}/>
		<Route path="contact" getComponent={routeContact}/>
		<Route path="questionnares" getComponent={routeQuestionnares}/>
		<Route path="questionnares/:id" getComponent={routeQuestionnares}/>
		<Route path="chat" getComponent={routeChat}/>
		<Route path="account" getComponent={routeAccount}/>
		<Route path="login" getComponent={routeLogin}/>
		<Route path="register" getComponent={routeRegister}/>
		<Route path="vetmain" getComponent={routeVetMain}/>
		<Route path="vetnewsurvey" getComponent={routeVetNewSurvey}/>
		<Route path="vetnewanimal" getComponent={routeVetNewAnimal}/>
		<Route path="vetinformationinput" getComponent={routeVetInformationInput}/>
		<Route path="forgot" getComponent={routeForgot}/>
		<Route path="vetchat" getComponent={routeVetChat}/>
	</Route>
);
