const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogList = require('../utils/bloglist')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = blogList.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('the correct number of blogs is returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogList.blogs.length)
})

test('a blog can be added', async () => {
  const newBlog= {
    title: 'Dogs are the best',
    author: 'Corgi McCorgson',
    url: 'https://wholetthedogsout.com',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body.length).toBe(blogList.blogs.length + 1)
  const titles = blogsAtEnd.body.map(r => r.title)
  expect(titles).toContain(
    newBlog.title
  )
})

afterAll(() => {
  mongoose.connection.close()
})