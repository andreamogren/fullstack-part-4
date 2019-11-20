const dummy = (blogs) => {
  return 1
}

const averageLikes = (blogs) => {
  const blogLikes = []
  blogs.map(blog => {
    blogLikes.push(blog.likes)
  })

  const reducer = (acc, item) => {
    return acc + item
  }

  return blogLikes.length === 0
    ? 0
    : blogLikes.reduce(reducer, 0) / blogLikes.length
}

module.exports = { dummy, averageLikes }
