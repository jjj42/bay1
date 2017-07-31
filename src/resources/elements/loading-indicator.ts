    
import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework'; 
    //noView because nprogress handles the rendering itself, no aurelia rendering (the loading-indicator.html) required.

@noView(['nprogress/nprogress.css'])
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}

  