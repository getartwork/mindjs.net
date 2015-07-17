/** @jsx dom */

/**
 * Imports.
 */

import { dom } from 'dekujs/deku';

/**
 * Define `Rating`.
 */

const propTypes = {
  disableHover: { type: 'boolean' },
  defaultValue: { type: 'number', optional: true },
  onRate: { type: 'function' }
};

/**
 * Render.
 */

function render({ props, state }, updateState) {
  let { disableHover, defaultValue, onRate } = props;
  let rating = state.rating || defaultValue;

  return (
    <div class='Rating'>
      <Star name='1' onStar={ star } starred={ rating >= 1 } onRate={ rate } resetRating={ reset } disableHover={ disableHover }/>
      <Star name='2' onStar={ star } starred={ rating >= 2 } onRate={ rate } resetRating={ reset } disableHover={ disableHover }/>
      <Star name='3' onStar={ star } starred={ rating >= 3 } onRate={ rate } resetRating={ reset } disableHover={ disableHover }/>
      <Star name='4' onStar={ star } starred={ rating >= 4 } onRate={ rate } resetRating={ reset } disableHover={ disableHover }/>
      <Star name='5' onStar={ star } starred={ rating >= 5 } onRate={ rate } resetRating={ reset } disableHover={ disableHover }/>
    </div>
  );

  function star(newRating) {
    updateState({ rating: newRating });
  }
  
  function rate() {
    onRate(rating);
  }
  
  function reset() {
    updateState({ rating: defaultValue });
  }
}

let Star = {
  propTypes: {
    disableHover: { type: 'boolean' },
    starred: { type: 'boolean' },
    onStar: { type: 'function' },
    onRate: { type: 'function' }
  },

  render({ props, state }, updateState) {
    let { starred, name, onStar, onRate, resetRating, disableHover } = props;

    if (starred) {
      return <span class='Star starred' onMouseOver={ star } onClick={ onRate } onMouseLeave={ resetDefault }>★</span>;
    } else {
      return <span class='Star' onMouseOver={ star } onClick={ onRate } onMouseLeave={ resetDefault }>☆</span>;
    }

    function star() {
      if (!disableHover) onStar(Number(name));
    }

    function resetDefault() {
      if (!disableHover) resetRating();
    }
  }
};

/**
 * Exports.
 */

export default { propTypes, render }
