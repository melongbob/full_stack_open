const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blogs.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {  
  const blog = new Blogs(request.body)
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter