import { ClientFunction, Selector } from 'testcafe';

const baseUrl = 'https://vue-hn.herokuapp.com';
const getLocation = ClientFunction(() => document.location.href);

fixture`vue-hackernews`
  .page`${baseUrl}`;


test('URLに/topが含まれること', async t => {
  await t
    .expect(getLocation()).eql(`${baseUrl}/top`);
});

test('more>をクリックすると次のページにURLが切り替わること', async t => {  
  const more = Selector('.news-list-nav a:last-child');
  await t
    .click(more)
    .expect(getLocation()).eql(`${baseUrl}/top/2`);
});

const navList = ['new', 'show', 'ask', 'job'];
navList.map(nav => {
  test(`${nav}をクリックすると/${nav}にURLが切り替わること`, async t => {  
    const a = Selector(`nav.inner a[href="/${nav}"]`);
    await t
      .click(a)
      .expect(getLocation()).eql(`${baseUrl}/${nav}`);
  });
});
