const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('blog with the most likes', () => {

  const listWithOneBlog = [
    {
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }
  ]

  const blogs = [
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }, 
    { 
      _id: "5a422ba71b54a676234d17fb", 
      title: "TDD harms architecture", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
      likes: 0, 
      __v: 0 }, 
    { 
      _id: "5a422bc61b54a676234d17fc", 
      title: "Type wars", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
      likes: 2, 
      __v: 0 
    },
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0 
    } 
]

  const blogsWithSameLikes = [
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 1, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 7, 
      __v: 0 
    }
  ]

  test('with one blog in the list is the only blog in the list', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: "React patterns", 
      author: "Michael Chan", 
      likes: 7
    })
  })

  test('in an empty list is an empty object', () => {
    expect(favoriteBlog([])).toEqual({})
  })

  test('in a list of multiple blogs is the blog with the most likes', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      likes: 12, 
    })
  })

  test('in a list with more than one blog with highest likes is the first blog with the highest likes', () => {
    expect(favoriteBlog(blogsWithSameLikes)).toEqual({
      title: "React patterns", 
      author: "Michael Chan", 
      likes: 7,
    })
  })
})