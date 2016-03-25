import {List, Map} from 'immutable';

// Produces the initial state tree
export function setEntries(state, entries) {
  // Set an entries key in the state Map, and set the value as a List of the given entries
  return state.set('entries', List(entries));
}

// State-with-entries -> State
// Remove the first two entries and place them in a new vote Map on the state
export function next(state) {
  const entries = state.get('entries');

  // Merge an update into the old state
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}