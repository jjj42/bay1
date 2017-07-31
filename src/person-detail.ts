    
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {PersonUpdated,PersonViewed,userStatusChanged} from './messages';
import {areEqual} from './utility';

interface Person {
  firstName: string;
  lastName: string;
  email: string;
	phone: string;
	mobile: string;
	jobRole: string;
	isUser: Boolean;
	password: string;
	modTime: Date;
}

@inject(WebAPI,EventAggregator)

export class PersonDetail {
  routeConfig;
  person: Person;
  originalPerson: Person;

  constructor(private api: WebAPI, private ea: EventAggregator) { }

  /**one of many life-cycle methods for _routed_ components. activate gets invoked right before the router is about to activate the component. 
   * This is also how the router passes the component its route parameters.  */
  activate(params, routeConfig) {
    this.routeConfig = routeConfig; /* This is the same configuration object that you created to configure the router itself. 
    You can get access to that here so that you can access any of its properties. The router generates a navModel for each routeConfig. 
    Using the navModel you can dynamically set the title of the document for this route. So, we call navModel.setTitle() in order to set up the document's title with the name of the Person that we just loaded.*/

    return this.api.getPersonDetails(params.id).then(person => {
      this.person = <Person>person;
      this.routeConfig.navModel.setTitle(this.person.firstName);
      this.originalPerson = JSON.parse(JSON.stringify(this.person));
      this.ea.publish(new PersonViewed(this.person));
    });
  }

  get canSave() {
    return this.person.firstName && this.person.lastName && !this.api.isRequesting; // isRequesting ist attribut in WebAPI Class
  }

  save() {
    this.api.savePerson(this.person).then(person => {
      this.person = <Person>person;
      this.routeConfig.navModel.setTitle(this.person.firstName);
      this.originalPerson = JSON.parse(JSON.stringify(this.person));
      this.ea.publish(new PersonUpdated(this.person));
    });
  }

  /** method of routed components.  it's a 'Hook'
   *  If present, this method is called before navigating away from the current component. 
   * It gives your component an opportunity to cancel navigation, if it desires.
  */
  canDeactivate() {
    if (!areEqual(this.originalPerson, this.person)) {            // ist aus der 'utility' datei
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if(!result) {
        this.ea.publish(new PersonViewed(this.person));
      }
      return result;
    }

    return true;
  }

  becomesUser() {
    this.api.savePerson(this.person).then(person => {
      this.originalPerson = JSON.parse(JSON.stringify(this.person));
      this.ea.publish(new userStatusChanged(this.person.isUser));
    });
  }


}

  