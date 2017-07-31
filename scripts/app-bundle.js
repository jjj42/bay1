var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('app',["require", "exports", "aurelia-framework", "./web-api"], function (require, exports, aurelia_framework_1, web_api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Persons';
            config.map([
                { route: '', moduleId: 'no-selection', title: 'Select' },
                { route: 'persons/:id', moduleId: 'person-detail', name: 'persons' }
            ]);
            this.router = router;
        };
        App = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI)
        ], App);
        return App;
    }());
    exports.App = App;
});

define('bay-objects',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Contact = (function () {
        function Contact() {
            this.isUser = false;
            this.password = null;
        }
        return Contact;
    }());
    exports.Contact = Contact;
    var Actor = (function () {
        function Actor() {
            this.isUser = false;
            this.password = null;
        }
        return Actor;
    }());
    exports.Actor = Actor;
    var Narrator = (function () {
        function Narrator() {
            this.isUser = false;
            this.password = null;
        }
        return Narrator;
    }());
    exports.Narrator = Narrator;
    var Musician = (function () {
        function Musician() {
            this.isUser = false;
            this.password = null;
        }
        return Musician;
    }());
    exports.Musician = Musician;
    var Buyout = (function () {
        function Buyout() {
            this.reminder = null;
        }
        return Buyout;
    }());
    exports.Buyout = Buyout;
    var BuyoutType;
    (function (BuyoutType) {
        BuyoutType[BuyoutType["Actor"] = 0] = "Actor";
        BuyoutType[BuyoutType["Narrator"] = 1] = "Narrator";
        BuyoutType[BuyoutType["Music"] = 2] = "Music";
    })(BuyoutType || (BuyoutType = {}));
    ;
    var CompanyType;
    (function (CompanyType) {
        CompanyType[CompanyType["_self"] = 0] = "_self";
        CompanyType[CompanyType["Customer"] = 1] = "Customer";
        CompanyType[CompanyType["Agency"] = 2] = "Agency";
        CompanyType[CompanyType["Production"] = 3] = "Production";
        CompanyType[CompanyType["Advertising"] = 4] = "Advertising";
        CompanyType[CompanyType["Brand"] = 5] = "Brand";
        CompanyType[CompanyType["Audio"] = 6] = "Audio";
        CompanyType[CompanyType["Music"] = 7] = "Music";
        CompanyType[CompanyType["Post"] = 8] = "Post";
        CompanyType[CompanyType["Scan"] = 9] = "Scan";
        CompanyType[CompanyType["Storage"] = 10] = "Storage";
    })(CompanyType || (CompanyType = {}));
    ;
    var Country;
    (function (Country) {
        Country[Country["Germany"] = 0] = "Germany";
        Country[Country["Denmark"] = 1] = "Denmark";
    })(Country || (Country = {}));
    ;
    var Language;
    (function (Language) {
        Language[Language["German"] = 0] = "German";
        Language[Language["Danish"] = 1] = "Danish";
    })(Language || (Language = {}));
    ;
    var Customer = (function () {
        function Customer(Company) {
            this.Company = Company;
        }
        return Customer;
    }());
    exports.Customer = Customer;
    var Clip = (function () {
        function Clip() {
            this.customer = null;
            this.agency = null;
            this.production = null;
            this.audioRec = null;
            this.audioMix = null;
            this.music = null;
            this.offline = null;
            this.storage = null;
        }
        return Clip;
    }());
    exports.Clip = Clip;
    var Prefs = (function () {
        function Prefs() {
        }
        return Prefs;
    }());
    exports.Prefs = Prefs;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('contact-detail',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./web-api", "./messages", "./utility"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, messages_1, utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonDetail = (function () {
        function PersonDetail(api, ea) {
            this.api = api;
            this.ea = ea;
        }
        PersonDetail.prototype.activate = function (params, routeConfig) {
            var _this = this;
            this.routeConfig = routeConfig;
            return this.api.getPersonDetails(params.id).then(function (Person) {
                _this.Person = Person;
                _this.routeConfig.navModel.setTitle(_this.Person.firstName);
                _this.originalPerson = JSON.parse(JSON.stringify(_this.Person));
                _this.ea.publish(new messages_1.PersonViewed(_this.Person));
            });
        };
        Object.defineProperty(PersonDetail.prototype, "canSave", {
            get: function () {
                return this.Person.firstName && this.Person.lastName && !this.api.isRequesting;
            },
            enumerable: true,
            configurable: true
        });
        PersonDetail.prototype.save = function () {
            var _this = this;
            this.api.savePerson(this.Person).then(function (Person) {
                _this.Person = Person;
                _this.routeConfig.navModel.setTitle(_this.Person.firstName);
                _this.originalPerson = JSON.parse(JSON.stringify(_this.Person));
                _this.ea.publish(new messages_1.PersonUpdated(_this.Person));
            });
        };
        PersonDetail.prototype.canDeactivate = function () {
            if (!utility_1.areEqual(this.originalPerson, this.Person)) {
                var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
                if (!result) {
                    this.ea.publish(new messages_1.PersonViewed(this.Person));
                }
                return result;
            }
            return true;
        };
        PersonDetail.prototype.becomesUser = function () {
            var _this = this;
            this.api.savePerson(this.Person).then(function (Person) {
                _this.originalPerson = JSON.parse(JSON.stringify(_this.Person));
                _this.ea.publish(new messages_1.userStatusChanged(_this.Person.isUser));
            });
        };
        PersonDetail = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], PersonDetail);
        return PersonDetail;
    }());
    exports.PersonDetail = PersonDetail;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('contact-list',["require", "exports", "aurelia-event-aggregator", "./web-api", "./messages", "aurelia-framework"], function (require, exports, aurelia_event_aggregator_1, web_api_1, messages_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContactList = (function () {
        function ContactList(api, ea) {
            var _this = this;
            this.api = api;
            this.selectedId = 0;
            ea.subscribe(messages_1.ContactViewed, function (msg) { return _this.select(msg.contact); });
            ea.subscribe(messages_1.ContactUpdated, function (msg) {
                var id = msg.contact.id;
                var found = _this.contacts.find(function (x) { return x.id == id; });
                Object.assign(found, msg.contact);
            });
        }
        ContactList.prototype.created = function () {
            var _this = this;
            this.api.getContactList().then(function (contacts) { return _this.contacts = contacts; });
        };
        ContactList.prototype.select = function (contact) {
            this.selectedId = contact.id;
            return true;
        };
        ContactList = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], ContactList);
        return ContactList;
    }());
    exports.ContactList = ContactList;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('messages',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonUpdated = (function () {
        function PersonUpdated(person) {
            this.person = person;
        }
        return PersonUpdated;
    }());
    exports.PersonUpdated = PersonUpdated;
    var PersonViewed = (function () {
        function PersonViewed(person) {
            this.person = person;
        }
        return PersonViewed;
    }());
    exports.PersonViewed = PersonViewed;
    var userStatusChanged = (function () {
        function userStatusChanged(person) {
            this.person = person;
        }
        return userStatusChanged;
    }());
    exports.userStatusChanged = userStatusChanged;
});

define('no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NoSelection = (function () {
        function NoSelection() {
            this.message = "Please Select a Person.";
        }
        return NoSelection;
    }());
    exports.NoSelection = NoSelection;
});

define('utility',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports.areEqual = areEqual;
    ;
});

define('web-api',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var latency = 1500;
    var id = 0;
    function getId() {
        return ++id;
    }
    var persons = [
        {
            id: getId(),
            firstName: 'John',
            lastName: 'Tolkien',
            email: 'tolkien@inklings.com',
            phone: '867-5309',
            mobile: '0239023',
            jobRole: 'Art Director',
            isUser: false,
            password: '02340249',
            modTime: '1968-11-16T00:00:00'
        },
        {
            id: getId(),
            firstName: 'Clive',
            lastName: 'Lewis',
            email: 'lewis@inklings.com',
            phone: '867-5309',
            mobile: '0239023',
            jobRole: 'Art Director',
            isUser: false,
            password: '02340249',
            modTime: '1968-11-16T00:00:00'
        },
        {
            id: getId(),
            firstName: 'Owen',
            lastName: 'Barfield',
            email: 'barfield@inklings.com',
            phone: '867-23424243',
            mobile: '0239023',
            jobRole: 'Art Director',
            isUser: false,
            password: null,
            modTime: '1968-11-16T00:00:00'
        },
        {
            id: getId(),
            firstName: 'Charles',
            lastName: 'Williams',
            email: 'williams@inklings.com',
            phone: '867-23424243',
            mobile: '0239023',
            jobRole: 'Art Director',
            isUser: false,
            password: '',
            modTime: '1968-11-16T00:00:00'
        },
        {
            id: getId(),
            firstName: 'Roger',
            lastName: 'Green',
            email: 'green@inklings.com',
            phone: '867-213213123',
            mobile: '0239023',
            jobRole: 'Art Director',
            isUser: false,
            password: 'kein passwort',
            modTime: '1968-11-16T00:00:00'
        },
        {
            id: getId(),
            firstName: 'Hank',
            lastName: 'DEA',
            email: 'hank@dea.org',
            phone: '234234-234234',
            mobile: '0239023',
            jobRole: 'DEA Agent',
            isUser: true,
            password: 'geheim',
            modTime: '1968-11-16T00:00:00'
        },
        {
            id: getId(),
            firstName: 'Fox',
            lastName: 'Moulder',
            email: 'fox@fbi.org',
            phone: '234234-234234',
            mobile: '0239023',
            jobRole: 'Poser',
            isUser: true,
            password: 'auch geheim',
            modTime: '1968-11-16T00:00:00'
        }
    ];
    var WebAPI = (function () {
        function WebAPI() {
            this.isRequesting = false;
        }
        WebAPI.prototype.getPersonList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var results = persons.map(function (x) {
                        return {
                            id: x.id,
                            firstName: x.firstName,
                            lastName: x.lastName,
                            email: x.email,
                            phone: x.phone,
                            mobile: x.mobile,
                            jobRole: x.jobRole,
                            isUser: x.isUser,
                            password: x.password,
                            modTime: x.modTime
                        };
                    });
                    resolve(results);
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getPersonDetails = function (id) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = persons.filter(function (x) { return x.id == id; })[0];
                    resolve(JSON.parse(JSON.stringify(found)));
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.savePerson = function (contact) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var instance = JSON.parse(JSON.stringify(contact));
                    var found = persons.filter(function (x) { return x.id == contact.id; })[0];
                    if (found) {
                        var index = persons.indexOf(found);
                        persons[index] = instance;
                    }
                    else {
                        instance.id = getId();
                        persons.push(instance);
                    }
                    _this.isRequesting = false;
                    resolve(instance);
                }, latency);
            });
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(['./elements/loading-indicator']);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/loading-indicator',["require", "exports", "nprogress", "aurelia-framework"], function (require, exports, nprogress, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoadingIndicator = (function () {
        function LoadingIndicator() {
            this.loading = false;
        }
        LoadingIndicator.prototype.loadingChanged = function (newValue) {
            if (newValue) {
                nprogress.start();
            }
            else {
                nprogress.done();
            }
        };
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], LoadingIndicator.prototype, "loading", void 0);
        LoadingIndicator = __decorate([
            aurelia_framework_1.noView(['nprogress/nprogress.css'])
        ], LoadingIndicator);
        return LoadingIndicator;
    }());
    exports.LoadingIndicator = LoadingIndicator;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('person-detail',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./web-api", "./messages", "./utility"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, messages_1, utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonDetail = (function () {
        function PersonDetail(api, ea) {
            this.api = api;
            this.ea = ea;
        }
        PersonDetail.prototype.activate = function (params, routeConfig) {
            var _this = this;
            this.routeConfig = routeConfig;
            return this.api.getPersonDetails(params.id).then(function (person) {
                _this.person = person;
                _this.routeConfig.navModel.setTitle(_this.person.firstName);
                _this.originalPerson = JSON.parse(JSON.stringify(_this.person));
                _this.ea.publish(new messages_1.PersonViewed(_this.person));
            });
        };
        Object.defineProperty(PersonDetail.prototype, "canSave", {
            get: function () {
                return this.person.firstName && this.person.lastName && !this.api.isRequesting;
            },
            enumerable: true,
            configurable: true
        });
        PersonDetail.prototype.save = function () {
            var _this = this;
            this.api.savePerson(this.person).then(function (person) {
                _this.person = person;
                _this.routeConfig.navModel.setTitle(_this.person.firstName);
                _this.originalPerson = JSON.parse(JSON.stringify(_this.person));
                _this.ea.publish(new messages_1.PersonUpdated(_this.person));
            });
        };
        PersonDetail.prototype.canDeactivate = function () {
            if (!utility_1.areEqual(this.originalPerson, this.person)) {
                var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
                if (!result) {
                    this.ea.publish(new messages_1.PersonViewed(this.person));
                }
                return result;
            }
            return true;
        };
        PersonDetail.prototype.becomesUser = function () {
            var _this = this;
            this.api.savePerson(this.person).then(function (person) {
                _this.originalPerson = JSON.parse(JSON.stringify(_this.person));
                _this.ea.publish(new messages_1.userStatusChanged(_this.person.isUser));
            });
        };
        PersonDetail = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], PersonDetail);
        return PersonDetail;
    }());
    exports.PersonDetail = PersonDetail;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('person-list',["require", "exports", "aurelia-event-aggregator", "./web-api", "./messages", "aurelia-framework"], function (require, exports, aurelia_event_aggregator_1, web_api_1, messages_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonList = (function () {
        function PersonList(api, ea) {
            var _this = this;
            this.api = api;
            this.selectedId = 0;
            ea.subscribe(messages_1.PersonViewed, function (msg) { return _this.select(msg.person); });
            ea.subscribe(messages_1.PersonUpdated, function (msg) {
                var id = msg.person.id;
                var found = _this.persons.find(function (x) { return x.id == id; });
                Object.assign(found, msg.person);
            });
        }
        PersonList.prototype.created = function () {
            var _this = this;
            this.api.getPersonList().then(function (persons) { return _this.persons = persons; });
        };
        PersonList.prototype.select = function (person) {
            this.selectedId = person.id;
            return true;
        };
        PersonList = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], PersonList);
        return PersonList;
    }());
    exports.PersonList = PersonList;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n  <require from=\"./person-list\"></require>    <!-- custom element -->\n                                              <!--  views are encapsulated, just like modules. This makes the person-list visible from within this view. -->\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>Persons</span>\n      </a>\n    </div>\n  </nav>\n\n  <loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <person-list class=\"col-md-4\"></person-list>  <!-- custom element, via require eingebunden -->\n      <router-view class=\"col-md-8\"></router-view>  <!-- router-view is provided by Aurelia, where the router should render the current route -->\n    </div>\n  </div>\n</template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!contact-detail.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Profile</h3>\n    </div>\n    <div class=\"panel-body\">\n      <form role=\"form\" class=\"form-horizontal\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">First Name</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"first name\" class=\"form-control\" value.bind=\"contact.firstName\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Last Name</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"last name\" class=\"form-control\" value.bind=\"contact.lastName\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Email</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"email\" class=\"form-control\" value.bind=\"contact.email\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Phone Number</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"phone number\" class=\"form-control\" value.bind=\"contact.phone\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Mobile Phone</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"mobile number\" class=\"form-control\" value.bind=\"contact.mobile\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Job/Role</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"job / role\" class=\"form-control\" value.bind=\"contact.jobRole\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">is user</label>\n          <div class=\"col-sm-9\">\n            <!--input type=\"checkbox\" placeholder=\"is user\" class=\"form-control\" value.bind=\"contact.isUser\"-->\n            <input type=\"checkbox\" checked.bind=\"contact.isUser\" />\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Password</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" disabled=\"${contact.isUser ? 'true' : 'false'}\" placeholder=\"password\" class=\"form-control\" value.bind=\"contact.password\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Modification Date</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"modification Date\" class=\"form-control\" value.bind=\"contact.Date\">\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <div class=\"button-bar\">\n    <button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button> <!-- canSave ist eine get-Methode, save() eine normale\n  </div>\n</template>"; });
define('text!contact-list.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"contact-list\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"contact of contacts\" class=\"list-group-item ${contact.id === $parent.selectedId ? 'active' : ''}\">\n        <a route-href=\"route: contacts; params.bind: {id:contact.id}\" click.delegate=\"$parent.select(contact)\">\n          <h4 class=\"list-group-item-heading\">${contact.firstName} ${contact.lastName}</h4>\n          <p class=\"list-group-item-text\">${contact.email}</p>\n        </a>\n      </li>\n    </ul>\n  </div>\n</template>"; });
define('text!no-selection.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"no-selection text-center\">\n    <h2>${message}</h2>\n  </div>\n</template>"; });
define('text!person-detail.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Profile</h3>\n    </div>\n    <div class=\"panel-body\">\n      <form role=\"form\" class=\"form-horizontal\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">First Name</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"first name\" class=\"form-control\" value.bind=\"person.firstName\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Last Name</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"last name\" class=\"form-control\" value.bind=\"person.lastName\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Email</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"email\" class=\"form-control\" value.bind=\"person.email\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Phone Number</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"phone number\" class=\"form-control\" value.bind=\"person.phone\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Mobile Phone</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"mobile number\" class=\"form-control\" value.bind=\"person.mobile\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Job/Role</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"job / role\" class=\"form-control\" value.bind=\"person.jobRole\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">is user</label>\n          <div class=\"col-sm-9\">\n            <!--input type=\"checkbox\" placeholder=\"is user\" class=\"form-control\" value.bind=\"person.isUser\"-->\n            <input type=\"checkbox\" checked.bind=\"person.isUser\" />\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Password</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" disabled=\"${person.isUser ? '' : 'disabled'}\" placeholder=\"no password set\" class=\"form-control\" value.bind=\"person.password\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-3 control-label\">Modification Date</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" placeholder=\"modification Date\" class=\"form-control\" value.bind=\"person.Date\">\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <div class=\"button-bar\">\n    <button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button> <!-- canSave ist eine get-Methode, save() eine normale\n  </div>\n</template>"; });
define('text!person-list.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"person-list\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"person of persons\" class=\"list-group-item ${person.id === $parent.selectedId ? 'active' : ''}\">\n        <a route-href=\"route: persons; params.bind: {id:person.id}\" click.delegate=\"$parent.select(person)\">\n          <h4 class=\"list-group-item-heading\">${person.firstName} ${person.lastName}</h4>\n          <p class=\"list-group-item-text\">${person.email}</p>\n        </a>\n      </li>\n    </ul>\n  </div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map