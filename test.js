const Nightmare = require('nightmare')
const assert = require('assert')

describe('Public Pages', function() {
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