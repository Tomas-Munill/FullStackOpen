describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Super user',
      userName: 'root',
      password: 'r00tme',
    };
    cy.createUser(user);
    cy.visit('http://localhost:5173');
  });

  it('Se muestra el Login form', function () {
    cy.contains('Log in to application');
  });

  describe('Inicia sesión', function () {
    it('tiene éxito con credenciales correctas', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('r00tme');
      cy.get('#btn-login').click();

      cy.contains('Super user logged in');
    });

    it('falla con credenciales incorrectas', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('invalid-password');
      cy.get('#btn-login').click();

      //cy.contains('invalid password')
      cy.get('.error').should('contain', 'invalid password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });

    describe('Cuando inició sesión', function () {
      beforeEach(function () {
        cy.login({ userName: 'root', password: 'r00tme' });
        const blog = {
          title: 'Tech blogGo To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…',
          likes: 0,
        };
        cy.createBlog(blog);
      });

      it('Un blog puede ser creado', function () {
        cy.contains('new blog').click();
        cy.get('#title').type('React patterns');
        cy.get('#author').type('Michael Chan');
        cy.get('#url').type('https://reactpatterns.com/');
        cy.get('#btn-create').click();

        cy.get('html').should('not.contain', '#frm-blog');
        cy.get('.error').should(
          'contain',
          'a new blog React patterns by Michael Chan added'
        );
        cy.get('html').should('contain', 'React patterns');
        cy.get('html').should('contain', 'Michael Chan');
      });

      it('Se puede dar me gusta a un blog', function () {
        cy.contains('Tech blogGo To Statement Considered Harmful')
          .parent()
          .contains('view')
          .click();
        cy.contains('Tech blogGo To Statement Considered Harmful')
          .parent()
          .contains('like')
          .click();

        cy.get('html').should('contain', 'likes 1');
      });

      it('Se puede eliminar un blog creado previamente por el mismo usuario', function () {
        cy.contains('Tech blogGo To Statement Considered Harmful')
          .parent()
          .contains('view')
          .click();
        cy.contains('Tech blogGo To Statement Considered Harmful')
          .parent()
          .contains('remove')
          .click();

        cy.get('html').should(
          'not.contain',
          'Tech blogGo To Statement Considered Harmful'
        );
      });

      it('Otros usuarios no pueden eliminar el blog', function () {
        cy.contains('logout').click();
        const user = {
          name: 'tomas',
          userName: 'tomunill',
          password: '123456',
        };
        cy.createUser(user);
        cy.login({ userName: 'tomunill', password: '123456' });
        cy.contains('Tech blogGo To Statement Considered Harmful')
          .parent()
          .contains('view')
          .click();
        cy.get('button').contains('remove').should('not.exist');
      });

      // Realice una prueba que verifique que los blogs estén ordenados de acuerdo con los likes con el blog con más likes en primer lugar.

      it('Los blogs están ordenados de acuerdo con los likes', function() {
        const blog1 = {
          title: 'El titulo con más likes',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 5,
        };
        const blog2 = {
          title: 'El segundo título con más likes',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 1,
        };
        cy.createBlog(blog1);
        cy.createBlog(blog2);

        cy.get('.visiblePorDefecto').eq(0).should('contain', 'El titulo con más likes')
        cy.get('.visiblePorDefecto').eq(1).should('contain', 'El segundo título con más likes')
        cy.get('.visiblePorDefecto').eq(2).should('contain', 'Tech blogGo To Statement Considered Harmful')
      })
    });
  });
});
