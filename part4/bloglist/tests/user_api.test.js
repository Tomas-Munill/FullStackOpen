const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
//const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  // agregar un usuario a la bd
  await User.deleteMany({});

  const password = 'r00tme';
  const passwordHash = await bcryptjs.hash(password, 10);

  const newUser = new User({
    userName: 'root',
    name: 'super user',
    passwordHash: passwordHash,
  });

  await newUser.save();
});

describe('Creación de usuarios', () => {
  test('Falla creación de usuario sin proporcionar contraseña', async () => {
    const newUser = {
      userName: 'tomim',
      name: 'Tomas Munill',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(1);
    expect(result.body.error).toBe('password missing');
  });

  test('Falla creación de usuario sin proporcionar nombre de usuario', async () => {
    const newUser = {
      name: 'Tomas Munill',
      password: '123456',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(1);
    expect(result.body.error).toBe(
      'User validation failed: userName: Path `userName` is required.'
    );
  });

  test('Falla creación de usuario al proporcionar un nombre de usuario ya utilizado', async () => {
    const newUser = {
      userName: 'root',
      name: 'Tomas Munill',
      password: '123456',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(1);
    expect(result.body.error).toBe(
      'User validation failed: userName: Error, expected `userName` to be unique. Value: `' +
        newUser.userName +
        '`'
    );
  });

  test('Falla creación de usuario al proporcionar contraseña menor a 3 caracteres', async () => {
    const newUser = {
      userName: 'tomim',
      name: 'Tomas Munill',
      password: '1',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(1);
    expect(result.body.error).toBe('password is less than 3 characters');
  });

  test('Falla creación de usuario al proporcionar nombre de usuario menor a 3 caracteres', async () => {
    const newUser = {
      userName: 't',
      name: 'Tomas Munill',
      password: '123456',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(1);
    expect(result.body.error).toBe(
      'User validation failed: userName: Path `userName` (`' +
        newUser.userName +
        '`) is shorter than the minimum allowed length (3).'
    );
  });

  test('Tiene éxito creación de usuario válido', async () => {
    const newUser = {
      userName: 'tomim',
      name: 'Tomas Munill',
      password: '123456',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    expect(usersAtEnd).toHaveLength(2);
    const userNames = usersAtEnd.map(user => user.userName);
    expect(userNames).toContain(newUser.userName);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
