import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from 'dispatcher_simone_fiorentino';
const PORT:number = 1337;
const DB_NAME = "MongoDB_Esercizi";


import {MongoClient} from 'mongodb';
const connectionString: string  = "mongodb://localhost:27017";

let _client:any;

/********************PARTE UTENTE  ****************/
//VA IN ERRORE SICCOME CHIUDE LA CONNESSIONE AL CLIENT PRIMA CHE IL CLIENT POSSA ESEGUIRE LA QUERY 
//Quindi si può usare il modulo async-await per aspettare che il client esegua la query (modulo di nodejs)
let connection = new MongoClient(connectionString);
connection.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    _client = client;
    let collection = client.db(DB_NAME).collection("Unicorn");
    collection.find({
        gender : "f",
        weight : {$gt : 600}
    })
    .project({
        name : 1,  // 1 visualizza il campo, 0 non lo visualizza
        gender : 1,
        hair : 1,
        _id : 0 //0 per non visualizzare il campo ID
    })
    .toArray((err:any, data:any) => {
        if(err) {
            console.log("Errore nella query");
            console.log(err.message);
        } else {
            console.log("Query eseguita con successo");
            console.log(JSON.stringify(data));
        }
    });

    let query = {
        $and : [
            {gender : "f"},
            {loves : "apple"}
        ]
    } //se si mettesse ["apple"] allora si prenderebbero tutti i unicorni che amano l'apple senno si farebbe un include tra i campi che contengono la parola mela
    let request = collection
        .find(query) //usare request come promise 
        .sort({name : 1}) //1 crescente, -1 decrescente
        .project({ "name" : 1, "loves" : 1, "_id" : 0})
        .toArray();
    request.then((data:any) => {
        console.log("Query eseguita con successo");
        console.log(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Errore nella query");
        console.log(err.message);
    })
})
.finally(() => {
    _client.close();
});