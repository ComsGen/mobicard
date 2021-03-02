const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then((client) => {
    console.log(`${MONGODB_URI} successfully connected`)

 
}).catch((err) => {
    console.log(err)
})