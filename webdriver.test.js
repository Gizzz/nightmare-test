const { 
  Builder, 
  By, 
  Key,
  promise,
  until, 
} = require('selenium-webdriver');

// disable promise manager for web-driver
promise.USE_PROMISE_MANAGER = false;

// jest default timeout: halfMinute for regular run, oneHour for debug
const halfMinute = 30000;
const oneHour = 1000 * 60 * 60;
jasmine.DEFAULT_TIMEOUT_INTERVAL = halfMinute;

const baseUrl = 'http://localhost:3000';
const selectors = {
  header: {},
  homePage: {},
  detailPage: {
    addToCartBtn: '.app .content.detail .add_to_cart-btn',
    viewCart_dialogBtn: 'html > body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1) > div:nth-child(1) > span:nth-child(1)',
  }
}

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

    await driver.navigate().to(baseUrl + '/cart')

    // cart should be empty
    await driver
      .findElement(By.css('.app .content.cart .empty-cart'))
      .isDisplayed()
      .then((result) => expect(result).toBe(true))

    await driver.navigate().to(baseUrl)

    // go to list page
    await driver
      .findElement(By.css(mensOutwearLink_selector)).click()
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/list/mens_outerwear'))
    
    // go to item page
    await driver
      .findElement(By.css(firstItemInList_selector)).click()
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path.startsWith('/detail/mens_outerwear')).toBe(true))

    // add item to cart, go to cart page
    await driver
      .findElement(By.css(selectors.detailPage.addToCartBtn)).click()
      .then(() => driver.findElement(By.css(selectors.detailPage.viewCart_dialogBtn)).click())
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/cart'))

    // cart should contain an item
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((elements) => expect(elements.length).toBe(1))
  });

  test('remove item from cart', async () => {
    await addItemToCart(driver)
    
    // click delete icon on cart item
    await driver
      .navigate().to(baseUrl + '/cart')
      .then(() => driver.findElement(By.css('.app .content.cart .items li')))
      .then((cartItem_element) => cartItem_element.findElement(By.css('.delete button')).click())
      
    // cart should be empty
    await driver
      .findElement(By.css('.app .content.cart .empty-cart'))
      .isDisplayed()
      .then((result) => expect(result).toBe(true))
  })
});

async function addItemToCart(driver) {
  await driver
    .navigate().to(baseUrl + '/detail/mens_outerwear/Anvil+L+S+Crew+Neck+-+Grey')
    .then(() => driver.findElement(By.css(selectors.detailPage.addToCartBtn)).click())
    .then(() => driver.findElement(By.css('body')).sendKeys(Key.ESCAPE))

  await driver.navigate().to(baseUrl)
}