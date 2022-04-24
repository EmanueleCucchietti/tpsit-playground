window.onload = function(){
    //viene eseguita il console log dal thread main
    console.log("Js Awesome 1");

    //viene accodata una funzione di microtask
    setTimeout(_=>console.log("Js Timeout 1"),0);
    Promise.resolve().then(_=>console.log("Js Promise"));

    //viene accodata una funzione di task
    setTimeout(_=>console.log("Js Timeout 2"),0);

    Promise.resolve().then(_=>console.log("Js Promise1"));

    console.log("Pause")
    //viene eseguita il console log dal thread main
    console.log("Js Awesome 2");

    //terminato un task si passa al successivo task
    //le callback per le animazioni vengono eseguite tutte quelle presenti nel momento di inizio dell'esecuzione delle callback stesse
    //le microtask continuano ad essere eseguite fino a quando non sono terminate tutte, anche quelle accodate successivamente

    //le microtask quindi bloccano il main thread, comreso il rendering
}