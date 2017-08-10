const oneHour = 1000 * 3600;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('app', () => {
  it('shold load the main page', () => {
    const Nightmare = require('nightmare');
    const nightmare = new Nightmare({
      show: true,
      width: 1480,
      height: 800,
    });

    return nightmare
      .goto('https://stark-cliffs-10206.herokuapp.com/')
      .end();
  });

  it.only('should add item to cart', () => {
    const Nightmare = require('nightmare');
    const nightmare = new Nightmare({
      show: true,
      width: 1480,
      height: 800,
    });

    return nightmare
      .goto('https://stark-cliffs-10206.herokuapp.com/')
      .wait(2000)
      .click('div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(2)')
      .wait(2000)
      .end();
  });
});