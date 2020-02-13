import {createStore, combineReducers} from 'redux';
import {AccountReducer} from "./components/AccountReducer";

export const store = createStore(AccountReducer);
