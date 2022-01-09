const {Builder, By, Key, until} = require('selenium-webdriver');
const months = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
async function firstTest() {
    let todayDate = new Date();
    let urlDate = "quotidiani-oggi-"+todayDate.getDate()-1+"-"+months[todayDate.getMonth()]+"-"+todayDate.getFullYear()+"-aggiornato-ore-pdf-in-download-scaricare-gratis-free/";
    console.log(urlDate)
    
    let driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://eurekaddl.cloud/newspapers/'+urlDate);
    await driver.findElement(By.linkText("Sole24")).sendKeys("Selenium",key.RETURN);

    await driver.quit();
};

firstTest();