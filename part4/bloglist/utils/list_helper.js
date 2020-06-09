const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikesBlog = blogs.reduce((a, b) => (b.likes > a.likes ? b : a), blogs[0])

  return mostLikesBlog
    ? {
        title: mostLikesBlog.title,
        author: mostLikesBlog.author,
        likes: mostLikesBlog.likes
      }
    : {}
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const grouped_authors = authors.reduce((group, author) => {
    group[author] = group[author] || []
    group[author].push(author)
    return group
  }, {})

  const mostBlog = { author:"", blogs:0}
  for(let author in grouped_authors){
    if(grouped_authors[author].length > mostBlog.blogs){
      mostBlog.author = author
      mostBlog.blogs = grouped_authors[author].length
    }
  }
  return mostBlog
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => {
    return { author: blog.author, likes: blog.likes }
  })
  const grouped_authors = authors.reduce((group, obj) => {
    group[obj.author] = group[obj.author] || []
    group[obj.author].push(obj.likes)
    return group
  }, {})

  const mostLikes = { author:"", likes:0}
  for(let author in grouped_authors){
    const sum = grouped_authors[author].reduce((a, b) => a + b, 0)
    if(sum > mostLikes.likes){
      mostLikes.author = author
      mostLikes.likes = sum
    }
  }
  return mostLikes
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}