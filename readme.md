Contact Manager (CRM Lite)

Users: Manage their own contact lists (name, phone, notes).
Admins: View all users and their contacts.
Associations: User → Contacts (One-to-Many)
Frontend: Dashboard with searchable contacts, form to add/update contact info.

// =======================
Contact:

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    
    owner: { 
        type: mongoose.Schema.Types.ObjectId,  
        default: 'User' 
    }
});


// =========================

-> login / signup
-> create contact
-> display contacts
-> edit contacts
-> delete contacts