const Blog = require('../models/blog');

const initialUsers = [
  {
    _id: '6a422a851b54a676234d17f7',
    userName: 'root',
    name: 'Super User',
    passwordHash: '$2a$10$wQT4XBWE7gLQNgFS7lWsueEy03CyNN4IFnW.wDpFOLoqMNu7t7Ddq',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ],
    __v: 0
  },
  {
    _id: '6a422a851b54a676234d17f8',
    userName: 'tomim',
    name: 'Tomas Munill',
    passwordHash: '$2a$10$wQT4XBWE7gLQNgFS7lWsueEy03CyNN4IFnW.wDpFOLoqMNu7t7Ddq',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc'
    ],
    __v: 0
  }
];


const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    user: '6a422a851b54a676234d17f7',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: '6a422a851b54a676234d17f7',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    user: '6a422a851b54a676234d17f7',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    user: '6a422a851b54a676234d17f8',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    user: '6a422a851b54a676234d17f8',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    user: '6a422a851b54a676234d17f8',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'EstoVaASerBorrado',
    author: 'EstoVaASerBorrado',
    url: 'EstoVaASerBorrado',
    likes: 0
  });
  const savedBlog = await blog.save();
  await Blog.findByIdAndDelete(savedBlog.id);

  return savedBlog.id;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  initialUsers
};
