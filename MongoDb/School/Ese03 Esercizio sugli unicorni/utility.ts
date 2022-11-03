import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from 'dispatcher_simone_fiorentino';
const PORT:number = 1337;
const DB_NAME = "MongoDB_Esercizi";


import {MongoClient} from 'mongodb';
const connectionString: string  = "mongodb://localhost:27017";

let server:any = http.createServer((req, res) => {
    //la callback di createserver viene richiamata ogni volta che arriva una richiesta
    dispatcher.dispatch(req, res); //richiamo il metodo dispatch della classe Dispatcher per gestire le richieste
});

server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta: " + PORT);
});

/********************PARTE UTENTE  ****************/
dispatcher.addListener("POST", "/api/unicorns", (req:any, res:any) => {
    let gender = req.BODY.gender;
    let connection = new MongoClient(connectionString);
    connection.connect()
    .catch((err) => {
        console.log("Errore di connessione al DB");
        console.log(err);
    })
    .then((client:any) => {
        let collection = client.db(DB_NAME).collection("Unicorn");
        let request = collection.find({"gender": gender}) //IN JSON
        .project({
            "_id": 1, 
            "name": 1,
            "gender" : 1,
            "hair" : 1,
            "weight" : 1,
            "loves" : 1
        })
        .sort({"name": 1}) //ordina per nome in ordine crescente 
        .toArray();
        request.then((unicorns:any) => {
            res.writeHead(200, headers.json);
            res.write(JSON.stringify(unicorns));
            res.end();
        }).catch((err:any) => {
            res.writeHead(503, headers.json);
            res.write(JSON.stringify(err));
            res.end();
        }).finally(() => {
            client.close();
        });
    })
});