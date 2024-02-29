const express = require('express')
const MemberModel = require('./memberSchema')

const memberRouter = express.Router();

memberRouter.get("/books/available", async (req, res) => {
    try {
        const members = await MemberModel.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

module.exports = memberRouter;