/* The app manage the most important italian raio stations */
/* The app is a simple web app that use node js via ts and a simple css js client */
/* The app doesn't use express but uses the dispatcher_simone_fiorentino from npm */
/* Files are read from states and radios json files */

import http from 'http';
import url from 'url';
import fs from 'fs';
import dispatcher from 'dispatcher_simone_fiorentino';
import radios from "./radios.json";
import states  from './states.json';

const PORT: number = 1337;
let errorPage: string;

let server = http.createServer((req, res) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT, () => {
    console.log("ewr");
    console.log(`Server running at port ${PORT}`);
    /* Read the error page */
    fs.readFile('./static/error.html', (err, data) => {
        if (err) throw err;
        errorPage = data.toString();
    });
    /* for each state update the station count based on the radio number of that state */
    states.map((state) => {
        state.stationcount = radios.filter((radio) => radio.state === state.name).length;
    });
    /* writes states to states.json */
    fs.writeFile('./states.json', JSON.stringify(states, null, 4), (err) => {
        if (err) throw err;
        console.log('States updated');
    });
});

dispatcher.addListener('GET', '/api/elenco', (req: any, res: any) => {
    console.log("ewr");
    /* returns the States Field of states json and the number of station of that state */
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let regioni = states.map((state) => ({ name: state.name, stationcount: state.stationcount }));
    res.end(JSON.stringify(regioni));
});

dispatcher.addListener('POST', '/api/elenco', (req: any, res: any) => {
    console.log("ewr");
    /* returns the radios of the specified state */
    
    let regione = capitalizeFirstLetter(req.BODY.regione.toString().toLowerCase());
    if(regione === "Tutti"){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(radios));
    }else if(states.find((state) => state.name === regione)){
        let radiosOfRegion = radios.filter((radio) => radio.state === regione);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(radiosOfRegion));
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(errorPage);
    }
});

dispatcher.addListener("POST", "/api/radios", (req: any, res: any) => {
    console.log("ewr");
    /* returns the radios of the specified state */
    let radiosOfRegion = radios.filter((radio) => radio.state === req.BODY.regione);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(radiosOfRegion));
});

dispatcher.addListener("POST", "/api/like", (req: any, res: any) => {
    console.log("ewr");
    /* doesn't return anything */
    /* increment by one the number of likes of a specific region */
    radios.map((radio) => { return radio.name === req.BODY.name ? parseInt(radio.votes) + 1 : radio.votes });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({"ok": true}));
});

/* functions */
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}