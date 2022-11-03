import http from 'http'
import url from 'url'
import fs from 'fs'
import headers from './headers.json';
import dispatcher from 'dispatcher_simone_fiorentino';
import news from './news.json';

const PORT:number = 1337;
let paginaErrore: string;

let server:any = http.createServer((req, res) => {
    //la callback di createserver viene richiamata ogni volta che arriva una richiesta
    dispatcher.dispatch(req, res); //richiamo il metodo dispatch della classe Dispatcher per gestire le richieste
    /* */
});

server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta: " + PORT);
    fs.readFile("./static/error.html", (err, data) => {
        if(!err) paginaErrore = data.toString();
        else paginaErrore = "<h3>Errore 404 Nessuna risorsa trovata</h3>";
    });
});

/**** CREAZIONE DEL LISTENER *****/
dispatcher.addListener("POST", "/api/elenco", (req:any, res:any) => {
    // GET -> req.get
    // POST -> req.BODY.nomeParametroPerPost
    res.writeHead(200, headers.json);
    res.write(JSON.stringify({"ris" : news}));
    res.end(); //ricordo chiudere sempre la risposta
});

dispatcher.addListener("POST", "/api/dettagli", (req:any, res:any) =>{
    res.writeHead(200, headers.json);
    let nameFile:string = req.BODY.nameFile;
    let path:string = "./news/" + nameFile;
    fs.readFile(path, (err, data) => {
        if (err) {
            res.write(JSON.stringify({"ris" : "Errore"}));
        } else {
            let idFile:number = req.BODY.idFile;
            let visualizzazioni:number = news[idFile]["visualizzazioni"];
            visualizzazioni++;
            news[idFile]["visualizzazioni"] = visualizzazioni;
            fs.writeFile("./news.json", JSON.stringify(news), (err) => {
                if (err)console.log(err);
            });
            res.write(JSON.stringify({"file" : data.toString(), "nVis" : visualizzazioni}));
        }
        res.end();
    });
});