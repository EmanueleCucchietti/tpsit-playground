import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from './dispatcher';

const PORT:number = 1337;
let paginaErrore:string;

let server:any = http.createServer((req, res) => {
    //la callback di createserver viene richiamata ogni volta che arriva una richiesta
    dispatcher.dispatch(req, res); //richiamo il metodo dispatch della classe Dispatcher per gestire le richieste
});

server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta: " + PORT);
});

/**** CREAZIONE DEL LISTENER *****/
dispatcher.addListener("GET", "/api/service1", (req:any, res:any) => {
    res.writeHead(200, headers.json);
    let data:any = { "ris" : "Benvenuto " + req.GET.nome }; 
    res.write(JSON.stringify(data));
    res.end(); //ricordo chiudere sempre la risposta
});

dispatcher.addListener("POST", "/api/service2", (req:any, res:any) => {
    res.writeHead(200, headers.json);
    let data:any;
    if(req.BODY.nome !== undefined) data = { "ris" : "Benvenuto "+ req.BODY.nome }; 
    else data = { "ris" : "Benvenuto!"};
    res.write(JSON.stringify(data));
    res.end();
});
