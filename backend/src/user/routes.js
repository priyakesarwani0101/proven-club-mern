const express = require('express')
const { findUser } = require('../user/model/db')

const userRouter = express.Router();

userRouter.get("/users/", async (req, res) => {
    const x = await findUser();
    console.log(x, '--------');
    res.send("Users");
});

module.exports = userRouter;