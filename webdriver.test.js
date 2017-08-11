const oneHour = 1000 * 3600;
jasmine.DEFAULT_TIMEOUT_INTERVAL = oneHour;

const baseUrl = 'https://stark-cliffs-10206.herokuapp.com';

describe('app', () => {
  it('should add item to cart', () => {
    const webdriver = require('selenium-webdriver');
    const By = webdriver.By;
    const until = webdriver.until;

    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

    const mensOutwearLink_selector = 'div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
    const addToCartBtn_selector = 'div#root > div.app:nth-child(1) > section.main:nth-child(2) > div.wrapper:nth-child(1) > span:nth-child(1) > div.content.detail:nth-child(1) > div.row:nth-child(1) > div.col.text:nth-child(2) > form:nth-child(3) > div.add_to_cart-btn:nth-child(4) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)';

    return driver
      .navigate().to(baseUrl + '/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip')
      .then(() => driver.findElement(By.css(addToCartBtn_selector)).click())
  });
});