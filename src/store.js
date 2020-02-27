import {createStore} from 'redux';
import {AccountReducer, initial_state} from "./components/AccountReducer";

export const store = createStore(AccountReducer, initial_state);

/*
Usage:

    import {store} from "../store"
    ...
    store.getState().variable

Format: look at AccountReducer- it has a 'initial_state' variable

Also use:
    const rerenderer = store.subscribe(() => this.forceUpdate());

in the constructor. [remember to call super()!]
This means the page will update itself when the store updates.
rerenderer actually returns a function- call it to stop the page re-updating
*/
