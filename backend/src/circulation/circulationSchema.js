const mongoose = require('mongoose');

const circularSchema = mongoose.Schema({
    BookID: {
        type: Number,
        required: true
    },
    MemberID: {
        type: Number,
        required: true
    },
    CheckoutDate: {
        type: Date,
        default: Date.now
    },
    ReturnDate: {
        type: Date,
        default: Date.now
    },
    EventType: {
        type: String,
        enum: ['checkout', 'return'],
        required: true
    }
}, {
    timestamps: true
})

const CirculationModel = mongoose.model('Circulation', circularSchema);

module.exports = CirculationModel;