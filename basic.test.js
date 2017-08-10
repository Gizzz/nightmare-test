// for callback tests
function fetchData(callback) {
  setTimeout(function() {
    callback();
  }, 1000);
}

// for promise tests
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

  it('testing mocks', () => {
    const myMock = jest.fn();
    myMock(1);
    myMock(2);
    console.log(myMock.mock.instances);
  });
});