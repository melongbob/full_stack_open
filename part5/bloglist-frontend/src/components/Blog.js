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
    <div>
      <div style={hideWhenVisible}>

        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>

      </div>

      <div style={showWhenVisible}>

        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>

        <div> {blog.url} </div>

        <div>
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
