const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
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