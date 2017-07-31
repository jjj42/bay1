/**PersonUpdated
 * Whenever the Person detail screen successfully saves a Person, we'll publish the PersonUpdated message.
 * Each of these messages will carry the Person data along with it so that subscribers have contextual data related to the event.
 */
export class PersonUpdated {
  constructor(public person) { }
}
/**PersonViewed 
 * whenever the end user begins viewing a new Person, we'll publish the PersonViewed message. 
 */
export class PersonViewed {
  constructor(public person) { }
}


export class userStatusChanged {
  constructor(public person) { }
}