
interface Person {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	mobile: string;
	email: string;
	jobRole: string;
	isUser: Boolean;
	password: string;
	modTime: Date;
	// alte / importierte Datenwerte sollten unions sein:
	// _phone: number|string;
}
/** Contact with id, firstName, lastName, phone, email */
export class Contact implements Person {
	id: number;
	public firstName: string;
	public lastName: string;
	phone: string;
	mobile: string;
	email: string;
	jobRole: string;
	isUser: Boolean= false;
	password: string= null;
	modTime: Date;
}

interface Artist {
	agency: Company;
}

export class Actor implements Person, Artist{
	id: number;
	public firstName: string;
	public lastName: string;
	phone: string;
	mobile: string;
	email: string;
	jobRole: string;
	isUser: Boolean= false;
	password: string= null;
	modTime: Date;
	agency: Company;
}
export class Narrator implements Person, Artist{
	id: number;
	public firstName: string;
	public lastName: string;
	phone: string;
	mobile: string;
	email: string;
	jobRole: string;
	isUser: Boolean= false;
	password: string= null;
	modTime: Date;
	agency: Company;
}
export class Musician implements Person, Artist{
	id: number;
	public firstName: string;
	public lastName: string;
	phone: string;
	mobile: string;
	email: string;
	jobRole: string;
	isUser: Boolean= false;
	password: string= null;
	modTime: Date;
	agency: Company;
}

export class Buyout{
	id: number;
	type: BuyoutType;
	artistID: number;
	country: Country;
	from: Date;
	to: Date;
	medium: String;
	reminder: Date = null;
}

enum BuyoutType { Actor, Narrator, Music };
enum CompanyType { _self, Customer, Agency, Production, Advertising, Brand, Audio, Music, Post, Scan, Storage }; // kann man Enums mit Werten aus DB befüllen?
enum Country {Germany, Denmark};	//muss gelegentlich akutalisiert & erweitert werden.
enum Language {German, Danish};

interface Company {
	id: number;
	name: string;
	type: CompanyType;
	phone1: string;
	phone2: string;
	email: string
	city: string;
	areacode: string;
	street: string;
	modTime: Date;
	contacts: Contact[]; 
	getType(): CompanyType;
}


export class Customer<T1 extends Company>{
	constructor(public Company: T1) {

	}
}


export class Clip{
	id: number;
	name: string;
	date1Airing: Date;
	language: Language;
	subtitles: Language;
	actors: Actor[];
	narrators: Narrator[];
	buyouts: Buyout[];
	companies: Company[];	// so???
	customer: Company= null;
	agency: Company= null;	// personalagentur?
	production: Company= null;
	audioRec: Company= null;
	audioMix: Company= null;
	music: Company= null;
	offline: Company= null;
	storage: Company= null;
	// oder ein clipCompany Object/enum/union, das bestimmte und ggf weitere companies enthält?
}

export class Prefs{

}