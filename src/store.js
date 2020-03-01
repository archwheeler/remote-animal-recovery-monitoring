import {createStore} from 'redux';
import {AccountReducer, initial_state} from "./components/AccountReducer";

export const store = createStore(AccountReducer, initial_state);

/*
Usage:

    import {store} from "../store"; (obviously find store.js from your context)
    ...
    store.getState().variable


Format: look at AccountReducer- it has a 'initial_state' variable

Also use:

  componentDidMount() {
    const sub = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    sub();
  }

This means the page will update itself when the store updates.
*/
