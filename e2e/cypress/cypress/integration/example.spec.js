describe('vue-hackernews-2.0', () => {
  it('topページへアクセスできること', () => {
    cy.visit('/');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/top');
    })
  });

  it('more>をクリックすると次のページにURLが切り替わること', () => {
    cy.visit('/');
    cy.get('.news-list-nav a:last-child').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(`/top/2`);
    });
  })

  const navList = ['new', 'show', 'ask', 'job'];
  navList.map(nav => {
    it(`${nav}をクリックすると/${nav}にURLが切り替わること`, () => {
      cy.visit('/');
      cy.get(`nav.inner a[href="/${nav}"]`).click();
      cy.location().should(loc => {
        expect(loc.pathname).to.eq(`/${nav}`);
      });
    });
  });

})
