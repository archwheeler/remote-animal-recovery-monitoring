import React from 'react';
import {render} from 'react-dom';
import createHashHistory from 'history/lib/createHashHistory';
import {Router, useRouterHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import './index.css';
import {store} from './store';
import {Provider} from 'react-redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = useRouterHistory(createHashHistory)();

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
