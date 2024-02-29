const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const circulationRouter = require('./src/circulation/routes');
const bookRouter = require('./src/book/routes')
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Mongodb connected')).catch((error) => console.log('Mongodb connection error: ' + error));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', circulationRouter)
app.use('/', bookRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})