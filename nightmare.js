const oneHour = 1000 * 3600;

const Nightmare = require('nightmare');
const nightmare = new Nightmare({ 
  show: true,
  width: 1480,
  height: 800,
  waitTimeout: oneHour,
});

nightmare
  .goto('https://stark-cliffs-10206.herokuapp.com/')
  // .wait(2000)
  .end()
  .then(function (result) {
    console.log('result:', result);
  })
  .catch(function (error) {
    console.error('error:', error);
  });