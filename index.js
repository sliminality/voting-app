import makeStore from './src/store';
import {startServer} from './src/server';

// The entry point for our app is a Redux Store
export const store = makeStore();

// Start the Socket.io and HTTP server
startServer(store);

// Load entries.json data
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});

// Kick off the vote
store.dispatch({type: 'NEXT'});