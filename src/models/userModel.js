const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    mail: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]
    }
});

UserSchema.methods.comparePassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
}

module.exports = mongoose.model("User",UserSchema);