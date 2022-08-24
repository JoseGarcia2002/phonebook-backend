const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

mongoose.connect()

const Contact = mongoose.model("contact", contactSchema)


/*
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

*/