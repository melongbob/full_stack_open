describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()

      cy.contains('a new blog a blog created by cypress by cypress added')
      cy.get('.blog').contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'cypress',
          url: 'www.cypress.com'
        })
      })

      it('user can like a blog', function () {
        cy.get('.blog')
          .contains('a blog created by cypress')
          .parent().parent()
          .as('theBlog')

        cy.get('@theBlog').contains('view').click()

        cy.get('@theBlog')
          .contains('like').click()

        cy.get('@theBlog')
          .get('.likes').contains('1')
      })

      it('a blog can be deleted', function () {
        cy.get('.blog')
          .contains('a blog created by cypress')
          .parent().parent()
          .as('theBlog')

        cy.get('@theBlog').contains('view').click()

        cy.get('@theBlog').contains('remove').click()
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog 1 created by cypress',
          author: 'cypress',
          url: 'www.cypress.com'
        })

        cy.createBlog({
          title: 'blog 2 created by cypress',
          author: 'cypress',
          url: 'www.cypress.com'
        })

        cy.createBlog({
          title: 'blog 3 created by cypress',
          author: 'cypress',
          url: 'www.cypress.com'
        })

        cy.contains('blog 3 created by cypress').parent().parent().as('blog3')
        cy.get('@blog3').contains('view').click()
        cy.get('@blog3').contains('like').click()
        cy.get('@blog3').contains('like').click()
        cy.contains('blog 2 created by cypress').parent().parent().as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').contains('like').click()

        cy.visit('http://localhost:3000')
      })

      it.only('blog is ordered according to likes', function () {
        cy.get('.blog')
          .then(blogs => {
            console.log(blogs)
            cy.wrap(blogs[0]).contains('view').click()
            cy.wrap(blogs[0]).get('.likes').contains(2)

            cy.wrap(blogs[1]).contains('view').click()
            cy.wrap(blogs[1]).get('.likes').contains(1)

            cy.wrap(blogs[2]).contains('view').click()
            cy.wrap(blogs[2]).get('.likes').contains(0)
          })
      })
    })
  })
})