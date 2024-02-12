const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
require('express-async-errors'); // permite eliminar los try-catch
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {userName:1, name:1, id:1});
  response.json(blogs);
});
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const tokenUser = request.user;

  const user = await User.findById(tokenUser.id);
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  const savedPopulatedBlog = await Blog.findById(savedBlog._id).populate('user', {userName:1, name:1, id:1});

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedPopulatedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor ,async (request, response) => {
  const tokenUser = request.user;

  const id = request.params.id;
  if (id.length !== 24) {
    return response.status(400).json({error: 'id con formato incorrecto'});
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({error: 'Blog no encontrado'});
  }
  // validar si el usuario que quiere eliminar es el creador del recurso
  if (blog.user.toString() !== tokenUser.id) {
    return response.status(401).json({ error: 'no puede eliminar un blog creado por otro usuario' });
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  if (id.length !== 24) {
    return response.status(400).json({error: 'Id con formato incorrecto'});
  }

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new:true}).populate('user', {userName:1, name:1, id:1});
  if (updatedBlog) {
    response.status(200).json(updatedBlog);
  }
  else {
    response.status(404).json({error: 'Blog no encontrado'});
  }

});

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({error: 'Blog no encontrado'});
  }

  blog.comments.push(comment);
  
  const updatedBlog = await blog.save();
  await updatedBlog.populate('user', { userName: 1, name: 1, id: 1 });

  return response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;