let latency = 1500;
let id = 0;

function getId(){
  return ++id;
}

let persons = [
  {
    id:getId(),
    firstName:'John',
    lastName:'Tolkien',
    email:'tolkien@inklings.com',
    phone:'867-5309',
    mobile: '0239023',
  	jobRole: 'Art Director',
	  isUser: false,
  	password: '02340249',
	  modTime: '1968-11-16T00:00:00'
  },
  {
    id:getId(),
    firstName:'Clive',
    lastName:'Lewis',
    email:'lewis@inklings.com',
    phone:'867-5309',
    mobile: '0239023',
  	jobRole: 'Art Director',
	  isUser: false,
  	password: '02340249',
	  modTime: '1968-11-16T00:00:00'
  },
  {
    id:getId(),
    firstName:'Owen',
    lastName:'Barfield',
    email:'barfield@inklings.com',
    phone:'867-23424243',
    mobile: '0239023',
  	jobRole: 'Art Director',
	  isUser: false,
  	password: null,
	  modTime: '1968-11-16T00:00:00'
  },
  {
    id:getId(),
    firstName:'Charles',
    lastName:'Williams',
    email:'williams@inklings.com',
    phone:'867-23424243',
    mobile: '0239023',
  	jobRole: 'Art Director',
	  isUser: false,
  	password: '',
	  modTime: '1968-11-16T00:00:00'
  },
  {
    id:getId(),
    firstName:'Roger',
    lastName:'Green',
    email:'green@inklings.com',
    phone:'867-213213123',
    mobile: '0239023',
  	jobRole: 'Art Director',
	  isUser: false,
  	password: 'kein passwort',
	  modTime: '1968-11-16T00:00:00'
  },
  {
    id:getId(),
    firstName:'Hank',
    lastName:'DEA',
    email:'hank@dea.org',
    phone:'234234-234234',
    mobile: '0239023',
  	jobRole: 'DEA Agent',
	  isUser: true,
  	password: 'geheim',
	  modTime: '1968-11-16T00:00:00'
  },
  {
    id:getId(),
    firstName:'Fox',
    lastName:'Moulder',
    email:'fox@fbi.org',
    phone:'234234-234234',
    mobile: '0239023',
  	jobRole: 'Poser',
	  isUser: true,
  	password: 'auch geheim',
	  modTime: '1968-11-16T00:00:00'
  }
];

export class WebAPI {
  isRequesting = false;
  
  getPersonList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = persons.map(x =>  { return {
          id:x.id,
          firstName:x.firstName,
          lastName:x.lastName,
          email:x.email,
          phone:x.phone,
          mobile:x.mobile,
          jobRole:x.jobRole,
          isUser:x.isUser,
          password:x.password,
          modTime:x.modTime
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getPersonDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = persons.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  savePerson(contact){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = persons.filter(x => x.id == contact.id)[0];

        if(found){
          let index = persons.indexOf(found);
          persons[index] = instance;
        }else{
          instance.id = getId();
          persons.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
