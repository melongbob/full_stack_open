import React, { useState } from 'react'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(props.blog)

  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    props.handleUpdate(newBlog)
    setBlog(newBlog)
  }

  const handleRemove = (blog) => {
    props.handleDelete(blog)
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible} className='hidden'>

        <div className='title'>{blog.title}</div>
        <div className='author'>{blog.author}</div>
        <button onClick={toggleVisibility}>view</button>

      </div>

      <div style={showWhenVisible} className='visible'>

        <div>
          <div className='title'>{blog.title}</div>
          <div className='author'>{blog.author}</div>
          <button onClick={toggleVisibility}>hide</button>
        </div>

        <div className='url'>{blog.url}</div>

        <div className='likes'>
          {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>

        <div> {blog.author} </div>

        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
