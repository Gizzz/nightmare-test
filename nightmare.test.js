const oneHour = 1000 * 3600;
jasmine.DEFAULT_TIMEOUT_INTERVAL = oneHour;

const baseUrl = 'https://stark-cliffs-10206.herokuapp.com';

describe('app', () => {
  it('should add item to cart', async () => {
    const Nightmare = require('nightmare');
    const nightmare = new Nightmare({
      show: true,
      width: 1480,
      height: 800,
      waitTimeout: oneHour,
    });

    const listPagePath = await nightmare
      // goto homepage
      .goto(baseUrl)
      // click to 'mens outwear' link
      .click('div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)')
      .evaluate(() => {
        return window.location.pathname;
      })
      // .end();

    expect(listPagePath).toBe('/list/mens_outerwear');

    const itemPagePath = await nightmare
      .goto(baseUrl + listPagePath)
      // wait untill items loaded
      .wait(1000)
      // click on first item in list
      .click('div#root > div.app:nth-child(1) > section.main:nth-child(2) > div.wrapper:nth-child(1) > span:nth-child(1) > div.content.list:nth-child(1) > ul.items:nth-child(3) > li:nth-child(1) > a:nth-child(1) > img:nth-child(1)')
      .evaluate(() => {
        return window.location.pathname;
      });
      
    expect(itemPagePath).toBe('/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip');
    
    const cartPagePath = await nightmare
      .goto(baseUrl + itemPagePath)
      // click 'add to cart' button
      .click('div#root > div.app:nth-child(1) > section.main:nth-child(2) > div.wrapper:nth-child(1) > span:nth-child(1) > div.content.detail:nth-child(1) > div.row:nth-child(1) > div.col.text:nth-child(2) > form:nth-child(3) > div.add_to_cart-btn:nth-child(4) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)')
      // click 'view cart' in modal dialog
      .wait(1000)
      .click('html > body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1) > div:nth-child(1) > span:nth-child(1)')
      .wait(1000)
      .evaluate(() => {
        return window.location.pathname;
      })
      .end();

    expect(cartPagePath).toBe('/cart');
  });

  xit('should navigate to item page', async () => {
    const Nightmare = require('nightmare');
    const nightmare = new Nightmare({
      show: true,
      width: 1480,
      height: 800,
      waitTimeout: oneHour,
    });

    const listPagePath = '/list/mens_outerwear';

    const itemPagePath = await nightmare
      .goto(baseUrl + listPagePath)
      .click('div#root > div.app:nth-child(1) > section.main:nth-child(2) > div.wrapper:nth-child(1) > span:nth-child(1) > div.content.list:nth-child(1) > ul.items:nth-child(3) > li:nth-child(1) > a:nth-child(1) > img:nth-child(1)')
      .evaluate(() => {
        return window.location.pathname;
      })
      .end();
      
    expect(itemPagePath).toBe('/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip');
  });
});