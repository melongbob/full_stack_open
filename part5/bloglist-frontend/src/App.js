import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {

      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {

      setMessage({ type:'error', content: 'Wrong username or password' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage({ type:'information', content: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch( error => {
        setMessage({ type:'error', content: error.response.data.error })
      })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlog = (blogObject) => {
    if(window.confirm(`Delete ${blogObject.name} by ${blogObject.author}?`)){
      blogService
        .remove(blogObject)
        .then(
          setBlogs(blogs.filter(b => b.id !== blogObject.id))
        )
    }
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject)
      .then(updatedBlog => {
        blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      })
      .catch( error => {
        setMessage({ type: 'error', content: error.response.data.error })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  if(user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <LoginForm loginUser={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={removeBlog}
            handleUpdate={updateBlog}
          />
        )
      }
    </div>
  )
}

export default App