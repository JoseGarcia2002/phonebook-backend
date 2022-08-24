require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const Contact = require("./models/contact")

morgan.token('body', function (req, res) {return JSON.stringify(req.body)})

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static("build"))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const randomId = () => {
    return Math.floor(Math.random()*(9*10**8))
}

/*
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
*/

app.route("/")
    .get((req, res) => {
        res.send("<h1>Hello World!</h1>")
    })

app.route("/info")
    .get((req, res) => {
        const date = new Date().toString()

        Contact.find({})
            .then(contacts => {
                const length = contacts.length
                res.send(`<p>Phone book has info for ${length} people</p> <p>${date}</p>`)
            })
    })

app.route("/api/persons")
    .get((req, res) => {
        Contact.find({}).then(contacts => {
            res.json(contacts)
        })
    })
    .post((req, res) => {
        const person = req.body
        if (!(person.name && person.number)) {
            return res.status(400).json({"error":"name and number are required"})
        }

        Contact.find({}).then(persons => {
            let repeat = false
            persons.forEach(per => {
                if (per.name === person.name) {
                    repeat = true
                }
            })
            if (repeat) {
                res.status(400).json({"error":"name must be unique"}).end()
            }
            else {
                const newPerson = new Contact({
                    name: person.name, 
                    number: person.number
                })
    
                newPerson.save().then(savedContact => {
                    res.json(savedContact)
                })
            }
        })
    })

app.route("/api/persons/:id")
    .get((req, res) => {
        const id = req.params.id

        Contact.findById(id)
            .then(foundNote => {
                if (foundNote) {
                    res.json(foundNote)
                }
                else {
                    res.status(404).end()
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    })
    .delete((req, res) => {
        const id = req.params.id

        Contact.findByIdAndRemove(id)
            .then(result => {
                res.status(204).end()
            })
            .catch(err => {
                console.log(err)
            })
    })
    .put((req, res, next) => {
        const id = req.params.id
        const body = req.body

        const newContact = {
            name: body.name,
            number: body.number, 
            id: id
        }

        Contact.findByIdAndUpdate(id, newContact, {new: true})
            .then(updatedContact => {
                res.json(updatedContact)
            })
            .catch(err => next(err))
    })

const errorHandler = (err, req, res, next) => {
    if (err.name = 'CastError') {
        return res.status(400).send({error: "malformatted id "})
    }
    next(err)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001; 
app.listen(PORT, (req, res) => {
    console.log("now listening on port", PORT)
})