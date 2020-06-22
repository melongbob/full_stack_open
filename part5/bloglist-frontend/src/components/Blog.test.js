import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'hello world',
    author: 'javascript',
    url: 'www.null-url.com',
    likes: 20
  }

  const component = render(
    <Blog blog = {blog} />
  )

  const div = component.container.querySelector('.blog').querySelector('.hidden')

  expect(div.querySelector('.title')).toBeDefined()
  expect(div.querySelector('.author')).toBeDefined()
  expect(div.querySelector('.url')).toBeNull()
})

test('renders content that shows url and likes as well', () => {
  const blog = {
    title: 'hello world',
    author: 'javascript',
    url: 'www.null-url.com',
    likes: 20
  }

  const component = render(
    <Blog blog = {blog} />
  )

  const div = component.container.querySelector('.blog').querySelector('.visible')

  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
  expect(div.querySelector('.url')).toBeDefined()
  expect(div.querySelector('.likes')).toBeDefined()
})

test('if like button is clicked twice, eventhandler is called twice', () => {
  const blog = {
    title: 'hello world',
    author: 'javascript',
    url: 'www.null-url.com',
    likes: 20
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog = {blog} handleUpdate = { mockHandler }/>
  )

  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})