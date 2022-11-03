//RICORDO: 
//uso il comando tsc --init per creare il file tsconfig.json
//modificare "resolveJsonModule":true per importare dei json
//andare a usare il comando ts-node server.ts per eseguire il file server.ts
//copiare la cartella launche.json in .vscode per avere il debugger

"use strict"

import _headers from "./headers.json";
import myUserClass, {sayHi, PI, months} from "./modulo" //importo la classe User, funzioni, variabili della mia libreria modulo.ts

console.log(_headers.html)
console.log(PI)
console.log(months[2])
console.log(sayHi("pippo"))

let user = new myUserClass("Mr", "Wolf") //creo un oggetto della classe User e potrei semplicemente esportare l'istanza dell'oggetto
console.log(user.concat())
console.log(user.PI)
console.log(user.months[2])
