const {Builder, By, Key, until} = require('selenium-webdriver');

async function firstTest() {
    let driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://google.com');
    await driver.findElement(By.name("q")).sendKeys("Selenium",key.RETURN);

    await driver.quit();
};

firstTest();