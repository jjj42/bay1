/**Previously, when we created the contact-list component, we required that into the app.html view and used it, 
 * since all views are encapsulated. 
 * However, we're going to do something different in this case, as an example. 
 * Aurelia actually gives you the ability to globalize view resources, such as custom elements. 
 * This is a convenience so that you don't have to require common resources repeatedly into every view. 
 * To do this, we need to register our element as a global resource.  */

import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(['./elements/loading-indicator']);
}

/*  With this registration in place, we can now use our new indicator in our app.html, 
but before we do that, we want to make one more change to our app.ts. 
We would like to be able to bind the indicator to the request state of our API, 
so we need to make that available in our App class. */
