const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blogs.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.post('/', (request, response, next) => {  
  const blog = new Blogs(request.body)

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter