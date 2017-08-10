const oneHour = 1000 * 3600;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = oneHour;

// function fetchData(callback) {
//   setTimeout(function() {
//     callback();
//   }, 1000);
// }

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve('res'), 
      1000,
    );
  });
}

describe('app', () => {
  it('testing async', async () => {
    const result = await fetchData();
    expect(result).toBe('res');

    return expect(fetchData()).resolves.toBe('res');
  });

  it.only('testing mocks', () => {
    const myMock = jest.fn();
    myMock(1);
    myMock(2);
    console.log(myMock.mock.instances);
  });

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