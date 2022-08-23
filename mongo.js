const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument")
    process.exit(1)
}

const password = process.argv[2]
const database = "phonebook"

const url = `mongodb+srv://josegarcia2002:${password}@cluster0.3mssxqs.mongodb.net/${database}?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model("contact", contactSchema)

const displayAll = process.argv.length < 4

mongoose
    .connect(url)
    .then(result => {
        console.log("connected")

        if (displayAll) {
            Contact.find({}).then(result => {
                result.forEach(contact => {
                    console.log(contact)
                })
                return mongoose.connection.close()
            })
        }
        else {
            const name = process.argv[3]
            const number = process.argv[4]

            const contact = new Contact({
                name: name,
                number: number
            })

            return contact.save()
        }
    })
    .then(() => {
        const message = displayAll ? "" : `added ${process.argv[3]} ${process.argv[4]} to phonebook`
        console.log(message)
        return mongoose.connection.close()
    })
    .catch(err => {
        console.log(err)
    })