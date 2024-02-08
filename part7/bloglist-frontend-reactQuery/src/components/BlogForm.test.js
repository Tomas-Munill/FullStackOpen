import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  /*
  Haga una prueba para el nuevo formulario de blog. La prueba debe verificar que el formulario llama al controlador de eventos que recibió como props con los detalles correctos cuando se crea un nuevo blog.
  */

  test('Componente llama al controlador que recibio como props con los detalles correctos al crear un blog', () => {
    const mockHandler = jest.fn();
    const componente = render(<BlogForm addBlog={mockHandler} />);

    const inputTitle = componente.container.querySelector('input[name="Title"]');
    const inputAuthor =
      componente.container.querySelector('input[name="Author"]');
    const inputUrl = componente.container.querySelector('input[name="Url"]');
    const form = componente.container.querySelector('form');

    fireEvent.change(inputTitle, {
      target: { value: 'test title input' },
    });
    fireEvent.change(inputAuthor, {
      target: { value: 'test author input' },
    });
    fireEvent.change(inputUrl, {
      target: { value: 'test url input' },
    });
    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe('test title input');
    expect(mockHandler.mock.calls[0][0].author).toBe('test author input');
    expect(mockHandler.mock.calls[0][0].url).toBe('test url input');
  });
});
