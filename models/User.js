// Load
const mongoose = require('mongoose');

// connect
mongoose.connect('mongodb+srv://obaidullahzeb182:obaid123@cluster0.chrpiit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

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