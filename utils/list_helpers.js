const dummy = (blogs) => {
  return 1
}

const averageLikes = (blogs) => {
  const reducer = (acc, item) => {
    return acc + item
  }

  return blogs.length === 0 
    ? 0
    : blogs.reduce(reducer, 0) / blogs.length
}

module.export = {dummy, averageLikes}
