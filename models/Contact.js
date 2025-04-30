// load
const mongoose = require('mongoose');

// connect
mongoose.connect(MONGOOSE_URI);

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
