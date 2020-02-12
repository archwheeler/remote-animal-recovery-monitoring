import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from './components/App';
import Main from './components/Main';

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

function routeDischargeInfo(s, cb) {
	System.import('./components/DischargeInfo').then(component => {
		cb(null, component.default || component);
	});
}

function routeDogProfileTemplate(s, cb) {
	System.import('./components/DogProfileTemplate').then(component => {
		cb(null, component.default || component);
	});
}

function routeSurveyTemplate(s, cb) {
	System.import('./components/SurveyTemplate').then(component => {
		cb(null, component.default || component);
	});
}
function routeChat(s, cb) {
	System.import('./components/Chat').then(component => {
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
		<Route path="dischargeinfo" getComponent={routeDischargeInfo}/>
		<Route path="dogprofiletemplate" getComponent={routeDogProfileTemplate}/>
		<Route path="surveytemplate" getComponent={routeSurveyTemplate}/>
		<Route path="chat" getComponent={routeChat}/>
	</Route>
);
