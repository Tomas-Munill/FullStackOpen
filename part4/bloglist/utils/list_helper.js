/* eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach(blog => {
    total += blog.likes;
  });

  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let mostLiked = blogs[0];
  blogs.forEach(blog => {
    if (blog.likes > mostLiked.likes) {
      mostLiked = blog;
    }
  });
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  };
};

const itIsAlready = (name, authors) => {
  const found = authors.find(authors => authors.name === name);
  return found;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // La función devuelve el author que tiene la mayor cantidad de blogs. 
  // El valor de retorno también contiene el número de blogs que tiene el autor principal

  const authors = []; // listado de obj: {name, cantidad}}
  
  blogs.forEach(blog => {
    let found = itIsAlready(blog.author, authors);
    if (found) {
      // si el autor ya está en la lista le sumo uno al atributo blogs
      let index = authors.findIndex(author => author.name === found.name);
      authors[index].blogs++;
    } else {
      // si el autor no esta lo agrego a lista
      authors.push({
        name: blog.author,
        blogs: 1
      });
    }
  });

  // busqueda del mayor en la lista de authors
  let authorMostBlogs = authors[0];
  authors.forEach(author => {
    if (author.blogs > authorMostBlogs.blogs) {
      authorMostBlogs = author;
    }
  });
  
  return authorMostBlogs;
  
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // La función devuelve el autor, cuyas publicaciones de blog tienen la mayor cantidad de me gusta. El valor de retorno también contiene el número total de likes que el autor ha recibido.

  const authors = []; // listado de obj: {author, likes}}

  blogs.forEach(blog => {
    let foundIndex = authors.findIndex(author => author.author === blog.author);
    if (foundIndex !== -1) {
      authors[foundIndex].likes += blog.likes;
    }
    else {
      authors.push({
        author: blog.author,
        likes: blog.likes
      });
    }
  });

  let authorMostLikes = authors[0];
  authors.forEach(author => {
    if (author.likes > authorMostLikes.likes) {
      authorMostLikes = author;
    }
  });

  console.log(authors);

  return authorMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};