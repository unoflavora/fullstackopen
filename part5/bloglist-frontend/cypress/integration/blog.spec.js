describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'test',
      password: 'password',
      name: 'admin'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
  
      cy.contains('admin Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wawrong')
      cy.get('#password').type('wawrong')
      cy.get('#login-button').click()
  
      cy.contains('invalid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()

      cy.get('#title').type('Dancing in The Wind')
      cy.get('#author').type('Imam Syahid')
      cy.get('#url').type('imamsyahid.diktus.id')

      cy.get('#submit-button').click()

      
    })

    it('A blog can be created', function() {
      cy.contains('Dancing in The Wind')
    })

    it('A blog can be liked', function() {
      cy.get('#visibility-button-0').click()
      cy.get('#like-button').click()
  
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.get('#visibility-button-0').click()
      cy.get('#delete-button').click()
      cy.get('#blog-title').should('not.exist')
    })

    it('A user cannot delete a blog made by another user', function() {
      cy.contains('Logout').click()
      cy.request('POST', 'http://localhost:3001/api/users', {
        username: 'wahh',
        password: 'wahh',
        name: 'wahh'
      })

      cy.get('#username').type('wahh')
      cy.get('#password').type('wahh')
      cy.get('#login-button').click()

      cy.get(`#visibility-button-0`).click()      
      cy.get('#delete-button').click()
      cy.get('.error')
    })

    it('Blogs are ordered according to likes', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('Dancing in The Wind II')
      cy.get('#author').type('Imam Syahid')
      cy.get('#url').type('url.id')
      cy.get('#submit-button').click()


      cy.get(`#visibility-button-1`).click()
      cy.get('#like-button').click()    

      cy.get(`#visibility-button-0`).click() //hide the button
      cy.get(`#visibility-button-1`).click()

      cy.contains('imamsyahid.diktus.id')


    })
  })



})

