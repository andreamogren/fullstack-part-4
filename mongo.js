const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack-course:${password}@cluster0-ws80k.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(people => {
    console.log('Phonebook:')
    people.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
}

if (process.argv.length >= 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(people => {
    console.log(`Added ${person.name} ${person.number} to the phonebook`)
    mongoose.connection.close()
  })
}



