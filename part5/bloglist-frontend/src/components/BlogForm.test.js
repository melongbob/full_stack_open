import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls eventHandler with right details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog = { createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'hello world' }
  })
  fireEvent.change(author, {
    target: { value: 'me' }
  })
  fireEvent.change(url, {
    target: { value: 'www.hello-world.ca' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('hello world')
  expect(createBlog.mock.calls[0][0].author).toBe('me')
  expect(createBlog.mock.calls[0][0].url).toBe('www.hello-world.ca')
})