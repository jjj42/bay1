    
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {PersonUpdated, PersonViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class PersonList {
  persons;
  selectedId = 0;

  constructor(private api: WebAPI, ea: EventAggregator) { 
    ea.subscribe(PersonViewed, msg => this.select(msg.person)); //select() ist funktion unten - vergibt style.
    ea.subscribe(PersonUpdated, msg => {     //  subscribe passing it the message type and a callback.
      let id = msg.person.id;
      let found = this.persons.find(x => x.id == id);
      Object.assign(found, msg.person);
    });
  }

  created() {
    this.api.getPersonList().then(persons => this.persons = persons);
  }

/** to instantly apply the selection style. Finally, normal use of .trigger or .delegate causes the default action of the event to be cancelled. 
 * But, if you return true from your method, as we have done above, it will be allowed to continue.  */
  select(person) {
    this.selectedId = person.id;
    return true;
  }
}
