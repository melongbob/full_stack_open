const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    "author": "Yun Kim", 
    "likes": 5, 
    "title": "melongbob-tumblr", 
    "url": "melongbob.tumblr.com",
    "user": "5ee6e85598615217d848db00"
  }, 
  {
    "author": "Yun Kim", 
    "likes": 5, 
    "title": "melongbob-github", 
    "url": "github.com/melongbob",
    "user": "5ee6e85598615217d848db00"
  }, 
  {
    "author": "Yun Kim", 
    "likes": 50, 
    "title": "melongbob-LinkedIn", 
    "url": "linkedin.com/seungyun-kim",
    "user": "5ee6e85598615217d848db00"
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

describe('post call test', () => {
  test('a blog can be successfully created', async () => {
    const newBlog = {
      "title": "melongbob-LinkedIn",
      "author": "Yun Kim",
      "url": "linkedin.com/seungyun-kim",
      "likes": 50
    }
  
    const result = await api
      .post('/api/login')
      .send({
        "username": "root",
        "password": "sekret"
      })
  
    const token = 'bearer ' + result.body.token.toString()
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: token })
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
  
    const result = await api
      .post('/api/login')
      .send({
        "username": "root",
        "password": "sekret"
      })
  
    const token = 'bearer ' + result.body.token.toString()
  
    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(savedBlog.body.likes).toBe(0)
  })
  
  test('missing title or url properties result in 400 Bad request', async () => {
    const newBlog = {
      "author": "Yun Kim",
      "likes": 50
    }
  
    const result = await api
      .post('/api/login')
      .send({
        "username": "root",
        "password": "sekret"
      })
  
    const token = 'bearer ' + result.body.token.toString()
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: token })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  
  test('a blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]

    const result = await api
      .post('/api/login')
      .send({
        "username": "root",
        "password": "sekret"
      })
  
    const token = 'bearer ' + result.body.token.toString()
  
    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set({ Authorization: token })
      .expect(204)
      
    const temp = await api.get('/api/blogs')
    const blogsAfterDeletion = temp.body
    expect(blogsAfterDeletion).toHaveLength(initialBlogs.length - 1)
  })

})

test('a blog can be updated', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  await api
    .put(`/api/blogs/${firstBlog.id}`)
    .send({ ...firstBlog, likes: 10 })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('when there is one existing user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'yunkim',
      name: 'Yun Kim',
      password: 'hello world'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails graciously when redundant username used', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'I am Groot',
      password: 'I am Groot'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails graciously when password is too short', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'I am Groot',
      password: 'I'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails graciously when username is too short', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'ro',
      name: 'I am Groot',
      password: 'I am Groot'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username is too short')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})