# Contact Manager App

A full-stack contact manager application built with:

- Node.js + Express (Backend)
- MongoDB Atlas with Mongoose (Database)
- EJS (Frontend)
- JWT & Bcrypt for Authentication

## Features

- User registration and login
- Create, edit, and delete contacts
- Profile page with all contacts
- Route protection using middleware

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Set up MongoDB Atlas and JWT secret in `.env`
4. Run `node app.js` to start the server


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
