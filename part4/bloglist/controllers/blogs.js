const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});
  
blogsRouter.post('/', async (request, response) => {
  
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0
  });

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // manejar errores de validación, como campos obligatorios faltantes
      response.status(400).json({ error: error.message });
    } else {
      // manejar otros tipos de errores
      logger.error(error);
      response.status(500).end();
    }
  }

});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  if (id.length !== 24) {
    return response.status(400).json({error: 'Id con formato incorrecto'});
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      response.status(204).end();
    }
    else {
      response.status(404).json({error: 'Blog no encontrado'});
    }
  } catch (error) {
    logger.error(error);
    response.status(500).end();
  }
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
    likes: request.body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new:true});
    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    }
    else {
      response.status(404).json({error: 'Blog no encontrado'});
    }
  } catch (error) {
    logger.error(error);
    response.status(500).end();
  }
});

module.exports = blogsRouter;