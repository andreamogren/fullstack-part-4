const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogList = require('../utils/bloglist')

mongoose.set('useFindAndModify', false)

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
  const newBlog = {
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

test('a blog can be deleted', async () => {
  const blogToDelete = blogList.blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body.length).toBe(blogList.blogs.length - 1)
  const titles = blogsAtEnd.body.map(r => r.title)
  expect(titles).not.toContain(
    blogToDelete.title
  )
})

test('a blog can be updated', async () => {
  const updatedBlog = {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 1
  }

  await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body.length).toBe(blogList.blogs.length)
  const titles = blogsAtEnd.body.map(r => r.title)
  expect(titles).toContain(
    updatedBlog.title
  )
})

afterAll(() => {
  mongoose.connection.close()
})