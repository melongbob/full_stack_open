const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    "author": "Yun Kim", 
    "likes": 5, 
    "title": "melongbob-tumblr", 
    "url": "melongbob.tumblr.com"
  }, 
  {
    "author": "Yun Kim", 
    "likes": 5, 
    "title": "melongbob-github", 
    "url": "github.com/melongbob"
  }, 
  {
    "author": "Yun Kim", 
    "likes": 50, 
    "title": "melongbob-LinkedIn", 
    "url": "linkedin.com/seungyun-kim"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsToStart = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogsToStart.map(blog => blog.save())
  Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(b => {
    expect(b.id).toBeDefined()
  })
})

test('a blog can be successfully created', async () => {
  const newBlog = {
    "title": "melongbob-LinkedIn",
    "author": "Yun Kim",
    "url": "linkedin.com/seungyun-kim",
    "likes": 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')
  const titles = response.body.map(b => b.title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain("melongbob-LinkedIn")
})

test('missing likes property will default to 0', async () => {
  const newBlog = {
    "title": "melongbob-LinkedIn",
    "author": "Yun Kim",
    "url": "linkedin.com/seungyun-kim"
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toBe(0)
})

test('missing title or url properties result in 400 Bad request', async () => {
  const newBlog = {
    "author": "Yun Kim",
    "likes": 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})