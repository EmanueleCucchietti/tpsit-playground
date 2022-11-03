//export const PI = 3.14;
const PI = 3.14;
let months = ['Jan','Feb','Mar','Apr','Aug','Sep','Oct','Nov','Dec'];


export let sayHi = (name:any) => "Hi " + name 

export default class User { //export default significa che posso importare la classe User senza specificare il nome o l'alias
	public title:string
	public name:string 
	constructor(title:any, name:any) {
		this.title = title;
		this.name = name;
	}
	public concat() {
		return this.title + ". " + this.name
	}
	public PI = 3.14
	public months = ['Jan','Feb','Mar','Apr','Aug','Sep','Oct','Nov','Dec'];
} 

export {PI, months}; //altro modo per esportare le variabili