import { ClientFunction, Selector } from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);
const more = Selector('.news-list-nav a:last-child');

fixture`vue-hackernews`
  .page`https://vue-hn.herokuapp.com/`


test('URLに/topが含まれること', async t => {
  await t
    .expect(getLocation()).contains('/top');
});

test('more>をクリックすると次のページにURLが切り替わること', async t => {  
  await t
    .click(more)
    .expect(getLocation()).contains('/top/2');
});
