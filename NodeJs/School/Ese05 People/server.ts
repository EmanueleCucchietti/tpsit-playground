import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from 'dispatcher_simone_fiorentino';
import people from './people.json';

const PORT:number = 1337;
let paginaErrore:string;
let persons:any | undefined = people.results;

let server:any = http.createServer((req, res) => {
    //la callback di createserver viene richiamata ogni volta che arriva una richiesta
    dispatcher.dispatch(req, res); //richiamo il metodo dispatch della classe Dispatcher per gestire le richieste
});

server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta: " + PORT);
});

/**** CREAZIONE DEL LISTENER *****/
dispatcher.addListener("GET", "/api/nations", (req:any, res:any) => {
    /* get get param */
    let nation = req.GET.nation;
    res.writeHead(200, headers.json);
    let data:string[] = []; //creo un array di stringhe vuoto
    for (const result of persons) {
        if(!data.includes(result.nat))
            data.push(result.nat);
    }
    data.sort();
    res.write(JSON.stringify({"ris" : data}));
    res.end(); //ricordo chiudere sempre la risposta
});

let getPerson = (person:any) => {
    return {
        "name": person.name.title + " " + person.name.first + " " + person.name.last,
        "city": person.location.city,
        "state": person.location.state,
        "cell": person.cell
    }
}

dispatcher.addListener("POST", "/api/persone", (req:any, res:any) => {
    let data:any[] = [];

    for (const person of persons) {
        if(person.nat == req.BODY.country){
            let personFound = getPerson(person);
            data.push(personFound);
        }
    } 
    res.writeHead(200, headers.json);
    res.write(JSON.stringify(data));
    res.end();
});

dispatcher.addListener("POST", "/api/details", (req:any, res:any) => {
    let personSearch = JSON.stringify(req.BODY.person);
    let personFounded:any | undefined = undefined;
    for (const person of persons) {
        let testPerson = JSON.stringify(getPerson(person));
        if(testPerson == personSearch){
            personFounded = person;
        }
    }

    if(personFounded == undefined){
        res.writeHead(404, headers.text);
        res.write("Errore non trovato");
    }
    else{
        res.writeHead(200, headers.json);
        res.write(JSON.stringify(personFounded)); //PS. ricordo fare lo stringfy quando mando un JSON
    }
    res.end();
});

dispatcher.addListener("POST", "/api/deletePerson",(req:any, res:any) => {
    let personSearch = JSON.stringify(req.BODY.person);
    let newPersons:any[] = []; 
    for (const person of persons)
        if(!(personSearch == JSON.stringify(getPerson(person)))) newPersons.push(person);


    if(newPersons == undefined){
        res.writeHead(404, headers.text);
        res.write("Errore nell'eliminazione");
    }
    else{
        persons = newPersons;
        res.writeHead(200, headers.json);
        res.write(JSON.stringify({"ris": "ok"})); //PS. ricordo fare lo stringfy quando mando un JSON
    }
    res.end();
});