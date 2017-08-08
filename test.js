const oneHour = 1000 * 3600;
jasmine.DEFAULT_TIMEOUT_INTERVAL = oneHour;

describe('app', () => {
  // it('should not fail', () => {
  //   expect(true).toBe(true);
  // });

  it('shold load main page', (done) => {
    const Nightmare = require('nightmare');
    const nightmare = new Nightmare({
      show: true,
      waitTimeout: oneHour,
      width: 1480,
      height: 800,
    });

    nightmare
      .goto('https://stark-cliffs-10206.herokuapp.com/')
      .end()
      .then(done);
  });
});