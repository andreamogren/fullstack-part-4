const listhelper = require('../utils/list_helpers.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listhelper.dummy(blogs)
  expect(result).toBe(1)
})
