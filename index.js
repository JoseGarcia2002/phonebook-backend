const express = require('express');
const app = express();

app.use(express.json())

const randomId = () => {
    return Math.floor(Math.random()*(9*10**8))
}

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.route("/")
    .get((req, res) => {
        res.send("<h1>Hello World!</h1>")
    })

app.route("/info")
    .get((req, res) => {
        const date = new Date().toString()
        const length = persons.length

        res.send(`<p>Phone book has info for ${length} people</p> <p>${date}</p>`)
    })

app.route("/api/persons")
    .get((req, res) => {
        res.json(persons)
    })
    .post((req, res) => {
        const person = req.body
        if (!(person.name && person.number)) {
            return res.status(400).json({"error":"name and number are required"})
        }
        let repeat = false
        persons.forEach(per => {
            if (per.name === person.name) {
                repeat = true
            }
        })
        if (repeat) {
            return res.status(400).json({"error":"name must be unique"})
        }
        const id = randomId()
        
        const newPerson = {...person, "id": id}
        persons = persons.concat(newPerson)
        res.json(newPerson)
    })

app.route("/api/persons/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const note = persons.filter(note => note.id === id)

        if (note) {
            res.json(note)
        }
        else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(person => person.id !== id)

        res.status(204).end()
    })

const PORT = 3000; 

app.listen(PORT, (req, res) => {
    console.log("now listening on port", PORT)
})