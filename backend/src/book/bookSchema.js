const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    BookID: {
        type: Number,
        required: true,
        unique: true
    },
    BookName: { type: String, required: true },
    NumberOfCopies: { type: Number, required: true },
}, {
    timestamps: true
})

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;