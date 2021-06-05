const { remote } = require('webdriverio');
const { config } = require('../../wdio.conf');

const navList = ['new', 'show', 'ask', 'job'];
navList.map(nav => {
  it(`${nav}をクリックすると/${nav}にURLが切り替わること`, async () => {  
    const browser = await remote({
      capabilities: { browserName: 'chrome' }
    })
    
    await browser.url(config.baseUrl)
    const a = await browser.$(`nav.inner a[href="/${nav}"]`)
    await a.click()

    await expect(browser).toHaveUrl(`${config.baseUrl}/${nav}`)
    // await browser.saveScreenshot(`screenshots/${nav}.png`)

    await browser.deleteSession()
  })
})