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
        required: true,
        validate: {
            validator: function(num) {
                if (num.includes("-")) {
                    const parts = num.split("-")
                    return (parts.length === 2 && parts[0].length > 1 && parts[0].length < 4 && !(isNaN(parts[0])) &&  !(isNaN(parts[1])) && parts[1].length > 0)
                }
                return true
            },
            message: props => `${props.value} is not a valid number`
        }
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