const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const category = require('./models/MainCategory')
const app = express();

app.use(cors())

mongoose.connect('mongodb://localhost/tajer', { useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Successful..."))
    .catch(() => console.log("Could not connect to MongoDB..."))
    

app.listen(5000, () => {
    console.log("Listing On Port 5000");
})

app.use(express.json());
app.use('/api/tajer', category)




