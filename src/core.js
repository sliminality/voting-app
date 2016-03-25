import {List, Map} from 'immutable';

// State w/o entries, Array -> State w/entries
// Produces the initial state tree
export function setEntries (state, entries) {
  // Set an entries key in the state Map, and set the value as a List of the given entries
  return state.set('entries', List(entries));
}

// Vote -> Entry
// Returns the winning Entry for a Vote
function getWinners (vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if (aVotes > bVotes)          return [a];
  else if (aVotes < bVotes)     return [b];
  else                          return [a, b];
}

// State w/entries -> State w/entries + vote
// Remove the first two entries and place them in a new vote Map on the state
export function next (state) {
  // Append winner(s) of current Vote to Entries
  const currentVote = state.get('vote');
  const winners = getWinners(currentVote);
  const entries = state.get('entries').concat(winners);

  // Check if there's only 1 remaining Entry
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }
  else {
    // Merge a new Vote into the old state
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

// State, Entry -> State
// Adds a tally field to the vote map
export function vote (state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    currentEntryTally => currentEntryTally + 1
  );
}