import {List, Map} from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const vA = vote.getIn(['tally', a], 0);
  const vB = vote.getIn(['tally', b], 0);
  if(vA > vB) return [a];
  if(vA < vB) return [b];
  return [a, b];
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
  .concat(getWinners(state.get('vote')));

  if(entries.size === 1) {
    return (state
      .remove('vote')
      .remove('entries')
      .set('winner', entries.first())
    );
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

export function vote(state, entry) {
  const entries = state.get('entries');
  return state.updateIn(
    ['vote','tally', entry],
    0,
    tally => (tally + 1)
  );
}
