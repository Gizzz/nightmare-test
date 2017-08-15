const { Builder, By, until, promise } = require('selenium-webdriver');

// disable promise manager for web-driver
promise.USE_PROMISE_MANAGER = false;

// set default timeout for jest
const oneHour = 1000 * 60 * 60;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const baseUrl = 'http://localhost:3000';

describe('app', () => {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().setSize(1500, 900);
    await driver.navigate().to(baseUrl);
  });

  afterEach(async function() {
    await driver.quit();
  });

  test('add item to cart', async () => {
    const mensOutwearLink_selector = 'div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)'
    const firstItemInList_selector = '.app .content.list .items li:nth-child(1) a img'
    const addToCartBtn_selector = '.app .content.detail .add_to_cart-btn'
    const viewCart_dialogBtn_selector = 'html > body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1) > div:nth-child(1) > span:nth-child(1)'

    await driver.navigate().to(baseUrl + '/cart')

    // cart should be empty
    await driver
      .findElement(By.css('.app .content.cart .empty-cart'))
      .isDisplayed()
      .then((result) => expect(result).toBe(true))

    await driver.navigate().to(baseUrl)

    // go to list page
    await driver.findElement(By.css(mensOutwearLink_selector)).click()
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/list/mens_outerwear'))
    
    // go to item page
    await driver.findElement(By.css(firstItemInList_selector)).click()
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path.startsWith('/detail/mens_outerwear')).toBe(true))

    // add item to cart, go to cart page
    await driver.findElement(By.css(addToCartBtn_selector)).click()
      .then(() => driver.findElement(By.css(viewCart_dialogBtn_selector)).click())
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/cart'))

    // cart should contain an item
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((elements) => expect(elements.length).toBe(1))
  });
});
