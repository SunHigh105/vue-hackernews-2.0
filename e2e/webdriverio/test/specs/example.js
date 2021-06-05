const { remote } = require('webdriverio');
const { config } = require('../../wdio.conf');

it('more>をクリックすると次のページにURLが切り替わること', async () => {
  const browser = await remote({
    capabilities: { browserName: 'chrome' }
  })

  await browser.url(config.baseUrl)

  const nextLink = await browser.$('.news-list-nav a:last-child')
  await nextLink.click()


  await expect(browser).toHaveUrl(`${config.baseUrl}/top/2`)
  // await browser.saveScreenshot(`screenshots/vue-hackernews-2.0.png`)
  await browser.deleteSession()
})
