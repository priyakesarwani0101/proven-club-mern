const express = require('express')
const BookModel = require('./bookSchema')

const bookRouter = express.Router();

bookRouter.get("/books/available", async (req, res) => {
    try {
        const books = await BookModel.find({ NumberOfCopies: { $gt: 0 } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

module.exports = bookRouter;