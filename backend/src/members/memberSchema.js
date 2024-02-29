const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    MemberID: {
        type: Number,
        required: true,
        unique: true
    },
    MemberName: { type: String, required: true },
}, {
    timestamps: true
})

const MemberModel = mongoose.model('MemberSchema', memberSchema);

module.exports = MemberModel;