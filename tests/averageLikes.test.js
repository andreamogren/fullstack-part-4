const listhelper = require('../utils/list_helpers.js')
const blogList = require('../utils/bloglist.js') //Put blog array in separate file to make this one easier to read

describe('average', () => {

  test('of empty array equals 0', () => {
    const result = listhelper.averageLikes([])

    expect(result).toBe(0)
  })

  test('of one value is the value itself', () => {
    const oneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const result = listhelper.averageLikes(oneBlog)

    expect(result).toBe(5)
  })

  test('of blog list to be calculated right', () => {
    const result = listhelper.averageLikes(blogList.blogs)

    expect(result).toBe(6)
  })

})












