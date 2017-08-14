const {Builder, By, until, promise} = require('selenium-webdriver');

promise.USE_PROMISE_MANAGER = false;

const oneHour = 1000 * 3600;
jasmine.DEFAULT_TIMEOUT_INTERVAL = oneHour;

const baseUrl = 'http://localhost:3000';

describe('app', () => {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().setSize(1500, 900);
    // driver.manage().window().maximize();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('should add item to cart', async () => {
    const webdriver = require('selenium-webdriver');

    const mensOutwearLink_selector = 'div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
    const addToCartBtn_selector = 'div#root > div.app:nth-child(1) > section.main:nth-child(2) > div.wrapper:nth-child(1) > span:nth-child(1) > div.content.detail:nth-child(1) > div.row:nth-child(1) > div.col.text:nth-child(2) > form:nth-child(3) > div.add_to_cart-btn:nth-child(4) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)';
    const viewCart_dialogBtn_selector = 'html > body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1) > div:nth-child(1) > span:nth-child(1)';

    await driver
      .navigate().to(baseUrl + '/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip')

    await driver.findElement(By.css('.app header.page .topline .cart .cart-badge'))
      .isDisplayed()
      .then((result) => expect(result).toBe(false))

    await driver.findElement(By.css(addToCartBtn_selector)).click()
      .then(() => driver.findElement(By.css(viewCart_dialogBtn_selector)).click())
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/cart'))

    await driver.findElement(By.css('.app header.page .topline .cart .cart-badge'))
      .getText()
      .then((text) => expect(text).toBe('1'))
  });
});
