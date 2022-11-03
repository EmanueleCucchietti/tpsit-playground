import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from 'dispatcher_simone_fiorentino';
const PORT:number = 1337;
const DB_NAME = "MongoDB_Esercizi";

import {MongoClient} from 'mongodb';
const connectionString: string  = "mongodb://localhost:27017";

/***************ELENCO QUERY *******************/
//1) Trovare gli unicorni che hanno un peso compreso tra 700 e 800
let query_1 = { 
    weight : {
        $gte : 700,
        $lte : 800
    }
};

//2) Trovare gli unicorni di genere maschile che amano l’uva e che hanno ucciso più di 60 vampiri
let query_2 = {
    "gender" : "m",
    "loves" : "grape",
    "vampires" : {$gte: 60}
};
//oppure si può scrivere con la notazione con and
/*$and : [
    {"gender" : "m"},
    {"loves" : "grape"},
    {"vampires" : 
        {$gte: 60}
    }
]*/

//Trovare gli unicorni di genere femminile o che pesano meno di 700 kg
let query_3 = {
    $or : [
        {"gender" : "f"},
        {"weight" : {$lt : 700}}
    ]
};

let connection = new MongoClient(connectionString);
connection.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let request = collection.find(query_1)
    .project({
        "_id": 0, 
        "name": 1,
        "gender" : 1,
        "hair" : 1,
        "weight" : 1,
        "loves" : 1
    })
    .sort({"name": 1}) //ordina per nome in ordine crescente 
    .toArray();
    request.then((unicorns:any) => {
        console.log("Query 1 eseguita con successo");
        console.log(JSON.stringify(unicorns));
    }).catch((err:any) => {
        console.log("Errore nella query");
        console.log(JSON.stringify(err));
    }).finally(() => {
        client.close();
    });
})

let connection2 = new MongoClient(connectionString);
connection2.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let request = collection.find(query_2)
    .project({
        "_id": 0, 
        "name": 1,
        "gender" : 1,
        "hair" : 1,
        "weight" : 1,
        "loves" : 1
    })
    .sort({"name": 1}) //ordina per nome in ordine crescente 
    .toArray();
    request.then((unicorns:any) => {
        console.log("Query 2 eseguita con successo");
        console.log(JSON.stringify(unicorns));
    }).catch((err:any) => {
        console.log("Errore nella query");
        console.log(JSON.stringify(err));
    }).finally(() => {
        client.close();
    });
})

let connection3 = new MongoClient(connectionString);
connection3.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let request = collection.find(query_3)
    .project({
        "_id": 0, 
        "name": 1,
        "gender" : 1,
        "hair" : 1,
        "weight" : 1,
        "loves" : 1
    })
    .sort({"name": 1}) //ordina per nome in ordine crescente 
    .toArray();
    request.then((unicorns:any) => {
        console.log("Query 3 eseguita con successo");
        console.log(JSON.stringify(unicorns));
    }).catch((err:any) => {
        console.log("Errore nella query");
        console.log(JSON.stringify(err));
    }).finally(() => {
        client.close();
    });
})