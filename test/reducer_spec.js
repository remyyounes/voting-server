import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';
import reducer from '../src/reducer';


describe('reducer', () => {

  it('it has initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal( fromJS({
      entries: ['Trainspotting'],
    }));
  });

  it('it can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal( fromJS({
      winner: 'Trainspotting',
    }));
  });

});
