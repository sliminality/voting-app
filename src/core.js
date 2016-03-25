import {List, Map} from 'immutable';

// State w/o entries, Array -> State w/entries
// Produces the initial state tree
export function setEntries(state, entries) {
  // Set an entries key in the state Map, and set the value as a List of the given entries
  return state.set('entries', List(entries));
}

// State w/entries -> State w/entries + vote
// Remove the first two entries and place them in a new vote Map on the state
export function next(state) {
  const entries = state.get('entries');

  // Merge an update into the old state
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

// State, Entry -> State
// Adds a tally field to the vote map
export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    currentEntryTally => currentEntryTally + 1
  );
}