import {createStore, combineReducers} from 'redux';
import {AccountReducer} from "./components/AccountReducer";

export const store = createStore(AccountReducer);
// Usage:

// import {store} from "./store"
// ...
// store.getState().variable

// Format:
/* 
{
  loggedIn: true,
  user: {
    name: "tom",
    age: 19
  }
};
*/
