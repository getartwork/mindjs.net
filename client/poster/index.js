/** @jsx dom */

/**
 * Imports.
 */

import { dom } from 'dekujs/deku';

/**
 * Define `Poster`.
 */

const propTypes = {
  url: { type: 'string' }
};

/**
 * Render.
 */

function render({ props, state }, updateState) {
  let { url } = props;

  return (
    <div class='App-poster'>
      <img src={ url } />
    </div>
  );
}


/**
 * Exports.
 */

export default { propTypes, render };
