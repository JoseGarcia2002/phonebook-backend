const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength:3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true
    }
})

contactSchema.set("toJSON", {
    transform: (document, returnedContact) => {
        returnedContact.id = returnedContact._id.toString()
        delete returnedContact._id
        delete returnedContact.__v
    }
})

mongoose.connect(url)

module.exports = mongoose.model("Contact", contactSchema)