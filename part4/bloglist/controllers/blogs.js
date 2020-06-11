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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blogs.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const updatedNote = await Blogs.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter