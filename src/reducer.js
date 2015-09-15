import {next, setEntries, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return state.update(
      'vote',
      voteState => vote(voteState, action.entry)
    );
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  }
  return state;
}
