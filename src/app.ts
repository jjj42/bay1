    
import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Persons';                                            // default browser title
    config.map([
      { route: '',             moduleId: 'no-selection',   title: 'Select'}, // individual browser title
      { route: 'persons/:id',  moduleId: 'person-detail', name:'persons' } // name:  We'll be able to use this later to generate routes without needing to copy/paste the route pattern everywhere. Instead, we can just refer to the route by name.
    ]);
    // Whenever you have a configureRouter method, the view must also contain a router-view. - app.html

    this.router = router;
  }
}

  