const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const User = require('./models/User');
const Contact = require('./models/Contact');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// ===================== isLoggedIn function for protected routes
function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        console.log("No token found in cookies");
        return res.redirect("/login");
    }
    try {
        const data = jwt.verify(req.cookies.token, "secretkey");
        console.log("Decoded token payload:", data); // ✅ Should show "userid"

        req.user = {
            id: data.userid  // <-- CORRECT FIELD NAME
        };

        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return res.redirect('/login');
    }
}

// ============================= Register
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/register', async (req, res) => {
    try {
        const {username, email, age, password} = req.body;
        
        // check if email is already used
        const userCheck = await User.findOne({email: email});
        if (userCheck) return res.send("User already exists");
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                try {
                    // Create user with explicitly empty contacts array
                    const newUser = await User.create({
                        username: username,
                        email: email,
                        age: age,
                        password: hash
                    });
                    
                    let token = jwt.sign({email: email, userid: newUser._id}, "secretkey");
                    res.cookie("token", token);
                    res.redirect("/profile");
                } catch (error) {
                    console.error("Error creating user:", error);
                    res.status(500).send("Error during registration: " + error.message);
                }
            });
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Error processing registration");
    }
});

// ============================= Log in
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    try {
        let {email, password} = req.body;
        
        const userPresent = await User.findOne({email: email});
        if (!userPresent) return res.send("Something went wrong");
        
        bcrypt.compare(password, userPresent.password, (err, result) => {
            if (result) {
                // Use jwt.sign instead of bcrypt.compare
                let token = jwt.sign({email: email, userid: userPresent._id}, "secretkey");
                res.cookie("token", token);
                res.redirect("/profile");
            }
            else res.redirect('/login');
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Error during login");
    }
})

// ============================= Log out
app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect('/login');
})

// ============================= Profile
app.get('/profile', isLoggedIn, async (req, res) => {
    const currentUser = await User.findById(req.user.id);
    const contacts = await Contact.find();
    
    if (!currentUser) return res.send("No such user present");
    res.render("profile", {currentUser, contacts});
    
})

app.post('/createContact', isLoggedIn, async (req, res) => {
    // Getting data from form
    const {name, email, phoneNumber} = req.body;
    console.log(name, ", ", email, ", ", phoneNumber);

    // getting username from jsonwebtoken
    const data = jwt.verify(req.cookies.token, "secretkey");
    console.log('payloaded data: ', data);

    const newContact = await Contact.create({
        name: name,
        email: email,
        phoneNo: phoneNumber,
        owner: data.userid
    })

    res.redirect('/profile');
})

// ===================== delete
app.post('/delete/:id', isLoggedIn, async (req, res) => {
    await Contact.findOneAndDelete({_id: req.params.id});
    res.redirect('/profile');
});

// ===================== edit 
app.post('/edit/:id', isLoggedIn, async (req, res) => {
    const currentUser = await User.findById(req.user.id);
    const contact = await Contact.findById(req.params.id);
    res.render('update', {contact, currentUser});
    
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;

        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).send("Contact not found");

        contact.name = name;
        contact.email = email;
        contact.phoneNo = phoneNumber;

        await contact.save();

        res.redirect('/profile');
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).send("Something went wrong");
    }
});

app.listen(3001, ()=>{
    console.log('Server listening on http://localhost:3001/');
})

