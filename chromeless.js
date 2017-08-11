const { Chromeless } = require('chromeless')

async function run() {
  const chromeless = new Chromeless()

  await chromeless
    .goto('https://www.google.com')
    .type('chromeless', 'input[name="q"]')
    .press(13)
    .wait('#resultStats')
    .wait(30000)
    .end()
    // .screenshot()

  // console.log(screenshot) // prints local file path or S3 url

  // await chromeless.end()
}

run().catch((err) => { console.error(err) })