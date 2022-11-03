import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from 'dispatcher_simone_fiorentino';
const PORT:number = 1337;
const DB_NAME = "MongoDB_Esercizi";


import {MongoClient} from 'mongodb';
const connectionString: string  = "mongodb://localhost:27017";

/********************PARTE UTENTE  ****************/
//Query di selezione in MONGO
let connection = new MongoClient(connectionString);
connection.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
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
        client.close(); //chiudere la connessione solamente quando ho finito di lavorare con il DB, nell'utlima query
    });
});


//USO DI QUERY CON PROMISE
//Query con and 
let connection2 = new MongoClient(connectionString);
connection2.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
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
    .finally(() => {
        client.close();
    });
});

//Query con l'inserimento di un nuovo elemento
let connection3 = new MongoClient(connectionString);
connection3.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    //insert a new unicorn
    let newUnicorn = {
        "name" : "Pippo",
        "loves" : ["apple", "banana"],
        "weight" : 500,
        "gender" : "m"
    }
    let request = collection.insertOne(newUnicorn);
    request.then((data:any) => {
        console.log("Query eseguita con successo");
        console.log(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Errore nella query");
        console.log(err.message);
    })
    .finally(() => {
        client.close();
    });
});

//Query con l'aggiornamento di un elemento
let connection4 = new MongoClient(connectionString);
connection4.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let query = { //1^PARAMETRO: campo di ricerca
        "name" : "Pippo"
    }
    let update = { //2^PARAMETRO: campo da aggiornare
        $set : { 
            vampires : ["Dracula", "Vlad"]
        }
        //è presente anche l'operatore $unset per eliminare un campo
        //oppure $set è un operatore di aggiornamento
        //oppure $inc per incrementare un campo
        //oppure $push per aggiungere un elemento ad un array
        //oppure $pull per rimuovere un elemento da un array
        //oppure $rename per rinominare un campo
        //oppure $mul per moltiplicare un campo
        //oppure $absert per aggiungere un campo
    }
    let request = collection.updateOne(query, update);
    //esiste updateOne: aggiorna un solo elemento (il primo che trova), updateMany: aggiorna più elementi
    request.then((data:any) => {
        console.log("Query eseguita con successo");
        console.log(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Errore nella query");
        console.log(err.message);
    })
    .finally(() => {
        client.close();
    });
});


//Query con l'eliminazione di un elemento
let connection5 = new MongoClient(connectionString);
connection5.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let query = { //1^PARAMETRO: campo di ricerca e ricordo è CASE SENSITIVE !!!
        "name" : "Pippo"
    }
    let request = collection.deleteMany(query);
    //esiste deleteOne: elimina un solo elemento (il primo che trova), deleteMany: elimina più elementi
    request.then((data:any) => {
        console.log("Query eseguita con successo");
        console.log(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Errore nella query");
        console.log(err.message);
    })
    .finally(() => {
        client.close();
    });
});

//Query con il conteggio degli elementi (records) 
let connection6 = new MongoClient(connectionString);
connection6.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let query = { //1^PARAMETRO: campo di ricerca e ricordo è CASE SENSITIVE !!!
        "gender" : "m",
        "weight" : { $gt : 700 } 
    }
    let request = collection.countDocuments(query);
    //countDocuments è un metodo che ritorna un numero
    request.then((data:any) => {
        console.log("Query eseguita con successo");
        console.log(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Errore nella query");
        console.log(err.message);
    })
    .finally(() => {
        client.close();
    });
});

//Query con il DISTINCT
let connection7 = new MongoClient(connectionString);
connection7.connect()
.catch((err) => {
    console.log("Errore di connessione al DB");
    console.log(err);
})
.then((client:any) => {
    let collection = client.db(DB_NAME).collection("Unicorn");
    let request = collection.distinct("hair", {"gender" : "m"});
    //distinct è un metodo che ritorna un array
    request.then((data:any) => {
        console.log("Query eseguita con successo");
        console.log(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Errore nella query");
        console.log(err.message);
    })
    .finally(() => {
        client.close();
    })
});
