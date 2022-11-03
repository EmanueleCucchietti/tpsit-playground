import _http from 'http'
import _url from 'url'
import _fs from 'fs'
import _mime from 'mime' // library for mime types (npm install mime)
import _headers from "./headers.json";

const PORT:number = 1337;
let paginaErrore:string;

//const server = _http.createServer(function(req:_http.IncomingMessage, res:_http.ServerResponse) {
const server = _http.createServer(function(req, res) {
    
    //per installare typescript bisogna andare a installare in node le seguenti liberie: 
    /*
        npm install typescript 
        npm install ts-node (globale)
    */
    //il server nodemon serve per far partire il server in automatico ogni volta che si fa una modifiche
    //bisogna togliere l'autosave di vscode (perchè altrimenti si fa partire il server ogni volta che si salva)
    //npm install nodemon (globale)
    //li scarichiamo globalmente siccome ci serve per farlo partire da diversi promt

    //scaricare il modulo npm install @types/node
    //per installare il modulo npm install mime con @types/mime (per avere l'interfaccia di typescript, siccome è una libreria un po vecchia)

    //per far partire il server bisogna andare nella cartella del progetto e scrivere: nodemon server.ts

    //bisogna poi inizialmente fare il run Add configuration e poi scegliere node.js e poi scrivere il nome del file da eseguire

    //se da ancora errore bisogna runnare tsc --init per creare il file tsconfig.json

    let method:string = req.method;
    let url:any = _url.parse(req.url, true); //true per parsare i parametri sottoforma di json
    let risorsa:string = url.pathname; //nome della risorsa
    let parametri:any = url.query; //parametri della risorsa (es: ?nome=luca&cognome=rossi)

    console.log(`Richiesta: ${method}, ${risorsa}, ${JSON.stringify(parametri)}`);

    if(risorsa == "/"){
        risorsa = "index.html";
    }
    if(!risorsa.startsWith("/api/")){
        //risorsa statica
        risorsa = "./static/" + risorsa;
        _fs.readFile(risorsa, (err, data) => {
            if(!err){
                let header = {ContentType: _mime.getType(risorsa)}; //usiamo mime per prendere il tipo di file, siccome non sappiamo se è contenuto nel file header.json
                res.writeHead(200, header);
                res.write(data);
                res.end();
            }
            else{
                res.writeHead(404, _headers.html);
                res.write(paginaErrore);
                res.end();
            }
        });
    }
    else{
        //risorsa dinamica
        if(risorsa == "/api/servizio1"){
            //servizio1
            let json:any = {"ris":"ok", "benvenuto": parametri.nome}; 
            res.writeHead(200, _headers.json);
            res.write(JSON.stringify(json)); //dobbiamo serializzare 
            res.end();
        }
        else{
            res.writeHead(404, _headers.text);
            res.write("Servizio non disponibile");
            res.end();
        }
    }
});

server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta: "+ PORT)
    _fs.readFile("./static/error.html", (err, data) => {
        if(!err){
            paginaErrore = data.toString();
        }
        else{
            paginaErrore = "<h3>Errore 404 Nessuna risorsa trovata</h3>";
        }
    });
});