import {setEntries, next, vote, INITIAL_STATE} from './core';

// State, Action -> State
// Figure out which function to call, and call it
export default function reducer (state = INITIAL_STATE, action) {
  // Delegate to one core function based on type of action
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT': 
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry));
  }

  // If reducer doesn't recognize action, just return the current state
  return state;
}