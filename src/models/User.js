const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('users',userSchema)