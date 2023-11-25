const express = require("express");
const path = require("path");
const app = express();
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gymcontent');
const port = 8000;


// Define mongoose schema
const gym = new mongoose.Schema({ 
name: String,
phone: String,
gender: String,
email: String,
address: String,
});

const Contact = mongoose.model('Contact', gym);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) 
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{    
    var myData =new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item has not been saved to database");
    })
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});