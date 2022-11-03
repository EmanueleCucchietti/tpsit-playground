import _http from 'http'
import _url from 'url'
import _fs from 'fs'
import _mime from 'mime' // library for mime types (npm install mime)
import _querystring from 'query-string';
import _headers from './headers.json';

let paginaErrore:string;

class Dispatcher {
    prompt:string = ">>> "
    listeners:any =  
    {
        "GET": { /* "risorsa1":"callback1", "risorsa2":"callback2" */ },
        "POST": {},
        "DELETE": {}, 
        "PUT": {}, 
        "PATCH": {} 
    } 
    constructor() { 
        init(); 
    }  

    //il this è la classe Dispatcher anche con la arrow function, siccome il this non viene ridefinito nei metodi di classe, fosse stato fuori allora si
    public addListener = (method:string, risorsa:string, callback:any) => {
        method = method.toUpperCase(); 
        if (method in this.listeners)
            this.listeners[method][risorsa] = callback; //vado a creare una chiave chiamata nome della risorsa e il valore sarà la funzione callback
        else throw new Error("Metodo non supportato"); //se il metodo non è supportato, la risorsa può essere qualsiasi cosa
    }

    private innerDispatch = (req:any, res:any) => { //questo metodo è privato, non può essere chiamato dall'esterno
        let method:string = req.method.toUpperCase(); //prendo il metodo della richiesta
        let url:any = _url.parse(req.url, true); //analizzo l'url e true per parsare i parametri
        let risorsa:string = url.pathname; //prendo la risorsa
        let params:any = url.query; //prendo i parametri sono JSON (parametri GET) 

        console.log(this.prompt + method + ":" + risorsa + " " + JSON.stringify(params)); //stampo il metodo e la risorsa
        
        req.GET = params; //creo una proprietà GET che contiene i parametri della richiesta GET
        //se il metodo è POST o in generale non GET, allora devo leggere i parametri dalla richiesta per forza      

        //console log dei parametri body
        if(req.BODY && JSON.stringify(req.BODY) !== "{}") console.log(this.prompt + "BODY: " + JSON.stringify(req.BODY));


        if(!risorsa.startsWith("/api/"))
            staticListener(req, res, risorsa);
        else 
        { 
            //richiesta dinamica 
            if (method in this.listeners && risorsa in this.listeners[method]) {
                //controlla se la risorsa è presente nella lista dei listener
                let callback = this.listeners[method][risorsa];
                callback(req, res); //se il metodo e la risorsa sono presenti, allora richiamo la funzione callback
                //passandoli i parametri req e res siccome nel main (server.ts) ho richiamato il metodo dispatch con req e res
            }
            else {
                res.writeHead(404, _headers.text); //se non trovo la risorsa, allora rispondo con errore 404, siccome non è 200 allora viene mandata una stringa e non un json
                res.write("Risorsa non trovata");
                res.end();
            }
        }
    }

    public dispatch = (req:any, res:any) => {
        //ritardo il dispatch per leggere i parametri POST
        let method = req.method.toUpperCase();
        if(method !== "GET"){
            //i parametri non sono nella query string ma nel body della richiesta
            let parameters:string = ""; 
            req.on("data", (data:any) => {
                parameters += data; 
            });
            req.on("end", () => {
                let json;
                //try catch per gestire se i parametri non sono in formato JSON 
                if(req.headers["content-type"].includes("json")){
                    json = JSON.parse(parameters); //se i parametri sono in formato JSON, allora li converto in un oggetto JSON
                }
                else{
                    json = _querystring.parse(parameters); //altrimenti li converto in un oggetto JSON da urlencoded
                } 
                req.BODY = json; //creo una proprietà body che contiene i parametri della richiesta POST/PUT/PATCH/DELETE
                this.innerDispatch(req, res); //richiamo il metodo innerDispatch
            });
        }
        else this.innerDispatch(req, res);
    }
}

let init = () => {
    _fs.readFile("./static/error.html", (err:any, data:any) => {
        if(!err)
            paginaErrore = data.toString();
        else 
            console.log("Errore nella lettura del file di errore");
    });
} 

let staticListener = (req:any, res:any, risorsa:string) => {
    if(risorsa == "/")
        risorsa = "/index.html";
    _fs.readFile("./static" + risorsa, (err:any, data:any) => {
        if(!err){
            //viene usato il listener per le risorse non statiche se esse lo sono basta solamente inviarla 
            let header:any = {"Content-Type": _mime.getType(risorsa)};
            res.writeHead(200, header);
            res.write(data);
            res.end();
        }
        else {
            res.writeHead(404, _headers.html);
            res.write(paginaErrore);
            res.end();
        }
    });
};

export default new Dispatcher; //esporto un oggetto di tipo Dispatcher