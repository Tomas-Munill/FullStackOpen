const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 100000);

describe('Obtener blogs', () => {
  /*
Utilice el paquete supertest para escribir una prueba que realice una solicitud HTTP GET a la URL /api/blogs. Verifique que la aplicación de la lista de blogs devuelva la cantidad correcta de publicaciones de blog en formato JSON.
 */
  test('La lista de blogs devuelta tiene la cantidad correcta de publicaciones de blog en formato JSON', async () => {
    const result = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/);

    expect(result.body).toHaveLength(helper.initialBlogs.length);
  });

  /*
Escriba una prueba que verifique que la propiedad de identificador único de las publicaciones del blog se llame id, de manera predeterminada, la base de datos nombra la propiedad _id. La verificación de la existencia de una propiedad se realiza fácilmente con el comparador toBeDefined de Jest.
*/
  test('Verificar que la propiedad de identificador único de las publicaciones del blog se llame id', async () => {
    const result = await api.get('/api/blogs');

    result.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });
});

describe('Creacón de un blog', () => {
  /*
  Escriba una prueba que verifique que al realizar una solicitud HTTP POST a la URL /api/blogs se crea correctamente una nueva publicación de blog. Como mínimo, verifique que el número total de blogs en el sistema se incremente en uno. También puede verificar que el contenido de la publicación del blog se guarde correctamente en la base de datos.

  Una vez finalizada la prueba, refactorice la operación para usar async/await en lugar de promesas.
  */

  let authToken;

  beforeAll(async () => {
    // borrar todos los usuarios
    await User.deleteMany({});

    // guardar un usuario en la bd
    const newUser = new User(helper.initialUsers[0]);
    await newUser.save();

    // loguear usuario y generar un token para enviar en las peticiones de creación
    const response = await api.post('/api/login').send({
      userName: newUser.userName,
      password: '123456',
    });
    authToken = response.body.token;
  });

  test('Un blog válido se añade a la base de datos', async () => {
    const newBlog = {
      title: 'T-bone ahumado',
      author: 'Oscar Sanchez',
      url: 'www.LaCapital.com/blogs/T-boneAhumado',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await Blog.find({});

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('T-bone ahumado');

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  /*
  Escribe una prueba que verifique que si la propiedad likes falta en la solicitud, tendrá el valor 0 por defecto. No pruebes las otras propiedades de los blogs creados todavía.

  Realice los cambios necesarios en el código para que pase la prueba.
  */

  test('Un blog sin propiedad likes se crea con 0 likes por defecto', async () => {
    const newBlog = {
      title: 'Brisket ahumado',
      author: 'Oscar Sanchez',
      url: 'www.LaCapital.com/blogs/BrisketAhumado',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await Blog.find({});

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(result.body.likes).toBeDefined();
    expect(result.body.likes).toBe(0);
  }, 100000);

  /*
  Escriba una prueba relacionada con la creación de blogs nuevos a través del endpoint /api/blogs, que verifique que si faltan las propiedades title y url de los datos solicitados, el backend responde a la solicitud con el código de estado 400 Bad Request.

  Realice los cambios necesarios en el código para que pase la prueba.
  */

  test('Un blog sin propiedad title y url no se guarda en la base de datos', async () => {
    const newBlogWithoutTitle = {
      author: 'Oscar Sanchez',
      url: 'www.LaCapital.com/blogs/BrisketAhumado',
      likes: 0,
    };

    const newBlogWithoutUrl = {
      title: 'Brisket ahumado',
      author: 'Oscar Sanchez',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlogWithoutTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlogWithoutUrl)
      .expect(400);

    const blogsAtEnd = await Blog.find({});

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  /*
  Escriba una nueva prueba para asegurarse de que la adición de un blog falla con el código de estado adecuado 401 Unauthorized si no se proporciona un token.
  */
  test('Falla al añadir un blog sin proporcionar token y retorna código 401', async () => {
    const newBlog = {
      title: 'T-bone ahumado',
      author: 'Oscar Sanchez',
      url: 'www.LaCapital.com/blogs/T-boneAhumado',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }); 

});

describe('Eliminación de un blog', () => {
  let authToken;

  beforeAll(async () => {
    // borrar todos los usuarios
    await User.deleteMany({});

    // guardar dos usuarios en la bd
    const user1 = new User(helper.initialUsers[0]);
    await user1.save();
    const user2 = new User(helper.initialUsers[1]);
    await user2.save();

    // loguear usuario y generar un token para enviar en las peticiones de creación
    const response = await api.post('/api/login').send({
      userName: user1.userName,
      password: '123456',
    });
    authToken = response.body.token;
  });

  test('Tiene exito al eliminar un blog existente', async () => {
    const id = helper.initialBlogs[0]._id;
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test('Falla al eliminar un blog con un id con formato incorrecto', async () => {
    const id = '123abc';
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(400);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('Falla al eliminar un blog no existente', async () => {
    const id = await helper.nonExistingId();
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(404);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('Falla al eliminar un blog sobre el cual no tiene permisos', async () => {
    const id = helper.initialBlogs[3]._id;
    const response = await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(401);

    expect(response.body.error).toBe('no puede eliminar un blog creado por otro usuario');
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('Actualización de un blog', () => {
  test('Tiene exito al actualizar un blog existente', async () => {
    const blog = helper.initialBlogs[0];
    blog.likes++;
    blog.title = 'title changed';

    const responde = await api
      .put(`/api/blogs/${blog._id}`)
      .send(blog)
      .expect(200);
    const updatedBlog = responde.body;
    expect(updatedBlog.likes).toBe(blog.likes);
    expect(updatedBlog.title).toBe('title changed');
  });

  test('Falla al actualizar un blog con un id con formato incorrecto', async () => {
    const id = '123abc';
    await api.put(`/api/blogs/${id}`).expect(400);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('Falla al actualizar un blog no existente', async () => {
    const id = await helper.nonExistingId();
  
    await api.put(`/api/blogs/${id}`).expect(404);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
