// load
const mongoose = require('mongoose');

// connect
mongoose.connect('mongodb+srv://obaidullahzeb182:obaid123@cluster0.chrpiit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// create schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    
    owner: { 
        type: mongoose.Schema.Types.ObjectId,  
        default: 'User' 
    }
});

// export model
module.exports = mongoose.model('Contact', ContactSchema);
