/** @jsx dom */

/**
 * Imports.
 */

import { dom } from 'dekujs/deku';
import movies from './movies.js';
import Rating from '../rating';
import Poster from '../poster';

/**
 * Define `App` properties.
 */

const propTypes = {
  numRated: { type: 'number', source: 'numRated' },
  predict: { type: 'function', source: 'predict' },
  rateMovie: { type: 'function', source: 'rate' },
  learn: { type: 'function', source: 'learn' },
  prediction: { source: 'prediction' }
};

/**
 * Render.
 */

function render({ props, state }, updateState) {
  let { predict, randomIndex, learn, numRated, rateMovie, prediction } = props;
  let index = randomIndex || random(movies.length);
  let movie = movies[index];
  let rating = 0;

  // If already learned, make a prediction.
  if (numRated > 10) {
    learn();
    rating = predict(movie);
  }

  var imageName = movie.title.split(' ').join('_').replace('\'', '');

  return (
    <div class='App'>
      <h1 class='App-title'>Demo</h1>
      <p class='App-description'>Choose a rating. Mind is using each movie's metadata to figure out the kinds of movies you like. After 10 ratings, you'll start to see predictions :)</p>
      <Poster url={ `images/${imageName}.jpg` }/>
      <button class='Skip--button' onClick={ skip }>Skip</button>
      <div class='App-rating'>
        <Rating defaultValue={ 0 } onRate={ rate }/>
      </div>
      { numRated > 10 ? <div class='App-rating'><h1 class='Prediction--header'>Predicted Rating: </h1><Rating defaultValue={ Math.round(rating) } onRate={ rate } disableHover={true}/></div> : null }
    </div>
  );

  // rate the movie
  function rate(rating) {
    window.analytics.track('Rated movie');
    rateMovie(rating, movie);
    updateState({ randomIndex: random(movies.length) });
  }

  function skip() {
    window.analytics.track('Skipped movie');
    updateState({ randomIndex: random(movies.length) });
  }

  // generate a random number between 0 and length
  function random(length) {
    return Math.floor(Math.random() * (length - 1)) + 1;
  }
}

/**
 * Exports.
 */

export default { propTypes, render }
