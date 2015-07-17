/** @jsx dom */

/**
 * Imports.
 */

import { deku, dom, render } from 'dekujs/deku';
import actions from './client/actions';
import App from './client/app';

/**
 * App.
 */

var app = deku(<App/>);

/**
 * Use the actions.
 */

app.use(actions());

/**
 * Render.
 */

render(app, document.querySelector('.Section'));
