const Nightmare = require('nightmare')
const assert = require('assert')

describe.skip('Public Pages', function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('/ (Home Page)', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('https://gethoodie.com')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/auth (Login Page)', () => {
    it('should load without error',  done => {
      nightmare.goto('https://gethoodie.com/auth')
        .end()
        .then(result => { done() })
        .catch(done)
    })

    
  })
})

describe('Login Page', function () {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    // show true lets you see wth is actually happening :)
    nightmare = new Nightmare({ show: true })
  })

  describe('given bad data', () => {
    it('should fail', done => {
      nightmare
      .goto('https://gethoodie.com/auth')
      .on('page', (type, message) => {
        if (type == 'alert') done()
      })
      .type('.login-email-input', 'notgonnawork')
      .type('.login-password-input', 'invalid password')
      .click('.login-submit')
      .wait(2000)
      .end()
      .then()
      .catch(done)
    })
  })
})