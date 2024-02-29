const express = require('express');
const BookModel = require(`../book/bookSchema`);
const CirculationModel = require('./circulationSchema')

const circulationRouter = express.Router();

circulationRouter.post("/checkout", async (req, res) => {
    try {
        const { BookID, MemberID, date } = req.body;
        const book = await BookModel.findOne({ BookID });
        if (book && book.NumberOfCopies > 0) {
            book.NumberOfCopies -= 1;
            await book.save();
            const parseDate = new Date(date)
            const newCirculation = new CirculationModel({ BookID, MemberID, EventType: 'checkout', CheckoutDate: parseDate });
            await newCirculation.save();
            res.status(200).send({
                message: "Book checked out successfully"
            })
        } else {
            res.status(404).send({
                message: "Book not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

circulationRouter.post('/return', async (req, res) => {
    try {
        const { BookID, MemberID, date } = req.body;
        const book = await BookModel.findOne({ BookID });
        book.NumberOfCopies += 1;
        await book.save();
        const parseDate = new Date(date)
        const circulationRecord = await CirculationModel.findOneAndUpdate({ BookID, MemberID, EventType: 'checkout', ReturnDate: { $exists: false } }, {
            $set: {
                ReturnDate: parseDate,
                EventType: 'return'
            }
        },
            { $new: true });
        res.status(200).send({
            message: "Book returned successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

circulationRouter.get('/overdue/:MemberID', async (req, res) => {
    try {
        const { MemberID } = req.params;
        const dueDate = 7;
        const finePerDay = 50;
        const currentDate = new Date('2023/05/31')
        const overdueBooks = await CirculationModel.find({ MemberID, EventType: 'checkout', ReturnDate: { $exists: false }, CheckoutDate: { $lt: new Date(currentDate.getTime - dueDate * 24 * 60 * 60 * 1000) } }).populate(BookID);
        const fine = overdueBooks.map((b) => {
            const dayOverDue = Math.floor((currentDate - b.CheckoutDate) / 1000 * 60 * 60 * 24) - dueDate;
            return {
                BookID: b.BookID,
                DaysOverDue: dayOverDue,
                Fine: dayOverDue * finePerDay
            }
        })
        res.status(200).json(fine);
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

module.exports = circulationRouter;