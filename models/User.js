// Load
const mongoose = require('mongoose');

// connect
mongoose.connect(MONGOOSE_URI);

// create schema
const UserSchema = new mongoose.Schema({
    
    username: String,
    email: String,
    
    age: String,
    password: String,
    
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 'Contact'
    }],

    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
});

// export model
module.exports = mongoose.model('User', UserSchema);
