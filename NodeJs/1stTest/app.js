let _http = require("http");
let _url = require("url");
const fs = require("fs");
const rp = require('request-promise');
let port = 1337;

let urlApi = "https://randomuser.me/api?results=10";

const requestOptions = {
    method: 'GET',
    uri: urlApi,
    qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
    },
    json: true,
    gzip: true
};



let server = _http.createServer(onRequest).listen(port);

function onRequest(req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('File not Found');
        }
        else {
            res.write(data);
        }
        res.end();
    });

    rp(requestOptions).then(response => {
        console.log('API call response:', response);
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
}
// se non si specifica l'indirizzo IP di ascolto il server viene avviato su tutte le interfacce
//server.listen(port);
console.log("server in ascolto sulla porta " + port);
console.log(urlApi);