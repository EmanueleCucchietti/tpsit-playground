const http=require('http');
const fs=require('fs');
const url=require('url');
const express=require("express");
const rp = require('request-promise');
const app=express();
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const path = require("path");
const { response } = require('express');
let urlApi = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
//let urlApi = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
//let urlApi = "sandbox-api.coinmarketcap.com";

let currency;
const keyApi = '';

const timeToRecall = 2880000;

/* ***************************** Avvio Server ****************************** */
const PORT = 1337
const server = http.createServer(app)
server.listen(PORT, function() {
    console.log("Server in ascolto sulla porta " + PORT);
    init();
});
let paginaErrore = "";
let htmlReturnValue = "";
let cssReturnValue = "";
let jsonCryptoCoins;
function init(req, res) {
    fs.readFile("./static/error.html", function(err, data) {
        if (!err)
            paginaErrore = data.toString();
        else
            paginaErrore = "<h1>Risorsa non trovata</h1>"
    });
    //PAGINA RETURN VALUE
    fs.readFile("./static/returnValue.html",function(err,data){
        if (!err)
            htmlReturnValue = data.toString();
        else
            htmlReturnValue = "<h1>Risorsa non trovata</h1>";
    });
    fs.readFile("./jsonFiles/cryptoCoins.json",function(err,data){
        if (!err){
            jsonCryptoCoins = JSON.parse(data)
        }
        else
        jsonCryptoCoins = "<h1>Risorsa non trovata</h1>";
    });

	// definizione di un nuovo metodo per il log dell'errore
	app.response.log = function(err) {
        console.log(`*********** Error ********* ${err.message}`)
    }
}


/* ************************** SEZIONE 1 : Middleware ********************** */

//  Request log
app.use("/", function (req,res,next) {
    console.log(req.method + " : " + req.originalUrl);
    next();
});


// route risorse statiche
app.use("/", express.static('./static'));


// routes di lettura dei parametri post
app.use("/", bodyParser.json());   
app.use("/", bodyParser.urlencoded({extended: true })); 


// 6 - log dei parametri 
app.use("/", function (req, res, next) {
    if(Object.keys(req.query).length != 0)
	    console.log("------> Parametri GET: " + JSON.stringify(req.query));
	if(Object.keys(req.body).length != 0)
	    console.log("------> Parametri BODY: " +JSON.stringify(req.body));
    next();
});


const requestOptions = {
    method: 'GET',
    uri: urlApi,
    qs: {
        // QS INDICA I PARAMETRI CHE NORMALMENTE VENGONO PASSATI IN GET NELL'URL
        /*
        'start': '1',
        'limit': '5000'*/
        'convert': currency,
        'symbol': "BTC,ETH,BNB,SOL,ADA,XRP,DOT,LUNA,AVAX,MATIC,CRO" 
    },
    headers: {
        //'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
        
        //Pro Key
        'X-CMC_PRO_API_KEY': keyApi
        },
    json: true,
    gzip: true
};
prepareDataFromApi();
setInterval(prepareDataFromApi,timeToRecall);

function prepareDataFromApi(){
    apiCall("USD");
    apiCall("EUR");
}

function apiCall(currency){
    requestOptions.qs.convert = currency;
    rp(requestOptions).then(response => {
        let returnedJson = response;
        addElementsToJson(returnedJson,currency);
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
}
function addElementsToJson(returnedJson, currency){
    for (const key in returnedJson.data) {
        if (Object.hasOwnProperty.call(returnedJson.data, key)) {
            const element = returnedJson.data[key];
            if(jsonCryptoCoins[key].prices == undefined)
                jsonCryptoCoins[key].prices = {};
            jsonCryptoCoins[key].prices[currency] = element.quote[currency].price;
        }
    }
    console.log(jsonCryptoCoins)
}

/* ********************** PAGINE HTML  ************************ */
app.set("returnValue", path.join(__dirname, "returnValue"));
app.set("view engine", "html");
app.get('/static/returnValue', function(req, res, next){
    res.send(htmlReturnValue);
    res.send(jsonCryptoCoins);
    //res.send(cssReturnValue);
})

/* ********************** (SEZIONE 2) CLIENT REQUEST  ************************ */

app.get('/api/richiestaGet', function(req, res, next) {
    let nome = req.query.nome;
    let eta = req.query.eta;
	if(!nome || !eta){
		// genero un errore lato server. 
		let err = new Error('Bad Request. Mancano i parametri nome/eta'); 
		next(err);  // next NON esegue il return
		res.status(400).send("Bad Request. Mancano param nome e/o eta");
	}
	else
       res.json("good morning " + nome + " La tua eta è " + eta);
       //res.send({ "nome": nome, "eta": eta })
});
app.get('/api/requestJson',function(req,res,next){
    res.send("Not anymore supported");
    /*
    res.json(jsonCryptoCoins);*/
})
app.get('/api/richiestaCryptoCurrency', function(req,res,next){
    res.send(jsonCryptoCoins);
});
/* **********************  DEFAULT ROUTE  ************************* */

// default route
app.use('/', function (req, res, next) {
    res.status(404)
    if (req.originalUrl.startsWith("/api/")) {
        res.send("Risorsa non trovata");
    }
    else  res.send(paginaErrore);
});

// gestione degli errori
app.use(function(err, req, res, next) {	
	console.log(err.stack);  // stack completo  
});
