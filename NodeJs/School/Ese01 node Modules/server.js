"use strict";

const _http = require("http");
const _url = require("url");
const _colors = require("colors");
const _fs = require("fs"); //modulo che permette di leggere i file accedendo al file system
const port = 1337;

const server=_http.createServer(function (req, res) {
    let metodo = req.method;
    // parsing della url ricevuta dal client. Senza il true i param vengono restituiti in url-encoded
    let url = _url.parse(req.url, true);
    let risorsa = url.pathname;
    let param = url.query;
    let dominio = req.headers.host;

    console.log("Richiesta Ricevuta : " + url.path.yellow ); // risorsa + parametri

    if(risorsa == "/favicon.ico") {
        //leggo l'immagine in maniera sincrona
        let img = _fs.readFileSync("favicon.ico");
        //invio l'immagine
        res.writeHead(200, {"Content-Type": "image/x-icon"});
        res.write(img);            
    }
    else{
        res.writeHead(200,{"Content-Type": "text/html;charset=utf-8" });
        res.write("<h1> Informazioni relative alla Richiesta ricevuta</h1>");
        res.write("<br>");
        res.write(`<p> Risorsa richiesta : ${risorsa} </p>`); // alt 96
        res.write(`<p> Metodo : ${metodo}</p>`);
        res.write(`<p> Parametri : ${JSON.stringify(param)}</p>`);
        res.write(`<p> Dominio richiesto : ${dominio}</p>`);
    }
    res.end();
});

// se non si specifica l'indirizzo IP di ascolto il server viene avviato su tutte le interfacce
server.listen(port, () => console.log("server in ascolto sulla porta " + port));


//con il comando node server.js si avvia il server
// per installare la libreria colors abbiamo usato il comando npm install colors --save
// per provare il server aprire il browser e digitare http://localhost:1337/?nome=marco&cognome=rossi
//ogni volta viene richiesta una pagina viene stampato il log della favicon.ico che è la risorsa richiesta dal browser per ottenere l'icona del sito