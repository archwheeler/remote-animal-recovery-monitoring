import {createStore, combineReducers} from 'redux';
import {AccountReducer} from "./components/AccountReducer";

export const store = createStore(AccountReducer);
 
/*
Usage:

    import {store} from "./store"
    ...
    store.getState().variable

Format:

    {
      loggedIn: false,
      choseId: false,
      vetAccount: false,
      data: {
        name: "tom",
        age: 19
      }
    };

Also use:

    const rerenderer = store.subscribe(() => this.forceUpdate());

in the constructor. [remember to call super()!]
This means the page will update itself when the store updates.
rerenderer actually returns a function- call it to stop the page re-updating
*/
