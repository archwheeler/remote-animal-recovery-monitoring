import {createStore, combineReducers} from 'redux';
import {LoginAction} from "./components/LoginAction";
import {LoginReducer, initial_state} from "./components/LoginReducer";

export const store = createStore(LoginReducer);
