import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let blog;
  let componente;
  let mockHandler;

  beforeEach(() => {
    blog = {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      user: '6a422a851b54a676234d17f7',
      url: 'https://reactpatterns.com/',
      likes: 7,
    };

    mockHandler = jest.fn();

    componente = render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} loggedUsername='root'/>);
  });

  /*
  Realice una prueba que verifique que el componente que muestra un blog muestre el título y el autor del blog, pero no muestre su URL o el número de likes por defecto

  Agregue clases de CSS al componente para ayudar con las pruebas según sea necesario.
  */

  test('Componente muestra solamente título y autor por defecto', () => {
    const div = componente.container.querySelector('.visiblePorDefecto');
    expect(div).toHaveTextContent('React patterns Michael Chan');
    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes.toString());
  });

  /*
  Realice una prueba que verifique que la URL del blog y el número de likes se muestran cuando se hace clic en el botón que controla los detalles mostrados.
  */

  test('Componente muestra URL y likes cuando se hace click en el boton para ver los detalles', () => {
    const divPorDefecto =
      componente.container.querySelector('.visiblePorDefecto');
    const divDetalles = componente.container.querySelector('.detalles');
    const boton = componente.getByText('view');
    fireEvent.click(boton);

    expect(divPorDefecto).toHaveStyle('display: none');
    expect(divDetalles).not.toHaveStyle('display: none');
    expect(divDetalles).toHaveTextContent(blog.url);
    expect(divDetalles).toHaveTextContent(blog.likes.toString());
  });

  /*
  Realice una prueba que garantice que si se hace clic dos veces en el botón like, se llama dos veces al controlador de eventos que el componente recibió como props.
  */

  test('Componente llama al controlador de eventos del boton like', () => {
    const boton = componente.getByText('like');
    fireEvent.click(boton);
    fireEvent.click(boton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
