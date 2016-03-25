import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
  // Initialize a new Store with our imported Reducer
  return createStore(reducer);
}