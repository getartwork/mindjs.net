
/**
 * Imports.
 */

import Mind from 'stevenmiller888/mind';
import genres from './genres';

/**
 * Expose `actions`.
 */

export default actions;

/**
 * Define `actions`.
 */

function actions(route) {
  return function(app) {
    app.action = app.set;
    
    /**
     * Constants.
     */
    
    const mind = Mind({ learningRate: 0.3 });
    const trainingData = [];
    let numRated = 0;
    
    /**
     * Actions.
     */

    app.action('rate', rate);
    app.action('learn', learn);
    app.action('predict', predict);

    /**
     * Add a rating.
     */

    function rate(rating, movie) {
      let input = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

      movie.genres.forEach(function(genre) {
        let index = genres.indexOf(genre);
        if (index > -1) input[index] = 1;
      });

      let data = { input: input, output: [ rating / 5 ] };
      trainingData.push(data);
      numRated += 1;
      app.set('numRated', numRated);
    }
  
    /**
     * Learn from the training data.
     */

    function learn() {
      mind.learn(trainingData);
    }

    /**
     * Predict the rating.
     */

    function predict(movie) {
      let input = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

      movie.genres.forEach(function(genre) {
        let index = genres.indexOf(genre);
        if (index > -1) input[index] = 1;
      });

      let prediction = mind.predict(input) * 5;

      return prediction;
    }
  };
}
