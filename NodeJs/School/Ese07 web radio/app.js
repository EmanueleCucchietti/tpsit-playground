"use strict";
/* The app manage the most important italian raio stations */
/* The app is a simple web app that use node js via ts and a simple css js client */
/* The app doesn't use express but uses the dispatcher_simone_fiorentino from npm */
/* Files are read from states and radios json files */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const dispatcher_simone_fiorentino_1 = __importDefault(require("dispatcher_simone_fiorentino"));
const radios_json_1 = __importDefault(require("./radios.json"));
const states_json_1 = __importDefault(require("./states.json"));
const PORT = 1337;
let errorPage;
let server = http_1.default.createServer((req, res) => {
    dispatcher_simone_fiorentino_1.default.dispatch(req, res);
});
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    /* Read the error page */
    fs_1.default.readFile('./static/error.html', (err, data) => {
        if (err)
            throw err;
        errorPage = data.toString();
    });
    /* for each state update the station count based on the radio number of that state */
    states_json_1.default.map((state) => {
        state.stationcount = radios_json_1.default.filter((radio) => radio.state === state.name).length;
    });
    /* writes states to states.json */
    fs_1.default.writeFile('./states.json', JSON.stringify(states_json_1.default, null, 4), (err) => {
        if (err)
            throw err;
        console.log('States updated');
    });
});
dispatcher_simone_fiorentino_1.default.addListener('GET', '/api/elenco', (req, res) => {
    /* returns the States Field of states json and the number of station of that state */
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let regioni = states_json_1.default.map((state) => ({ name: state.name, stationcount: state.stationcount }));
    res.end(JSON.stringify(regioni));
});
dispatcher_simone_fiorentino_1.default.addListener('POST', '/api/elenco', (req, res) => {
    /* returns the radios of the specified state */
    let regione = capitalizeFirstLetter(req.BODY.regione.toString().toLowerCase());
    if (regione === "Tutti") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(radios_json_1.default));
    }
    else if (states_json_1.default.find((state) => state.name === regione)) {
        let radiosOfRegion = radios_json_1.default.filter((radio) => radio.state === regione);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(radiosOfRegion));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(errorPage);
    }
});
dispatcher_simone_fiorentino_1.default.addListener("POST", "/api/radios", (req, res) => {
    /* returns the radios of the specified state */
    let radiosOfRegion = radios_json_1.default.filter((radio) => radio.state === req.BODY.regione);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(radiosOfRegion));
});
dispatcher_simone_fiorentino_1.default.addListener("POST", "/api/like", (req, res) => {
    /* doesn't return anything */
    /* increment by one the number of likes of a specific region */
    radios_json_1.default.map((radio) => { return radio.name === req.BODY.name ? parseInt(radio.votes) + 1 : radio.votes; });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "ok": true }));
});
/* functions */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
