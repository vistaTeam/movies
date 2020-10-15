const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// connecting to mongoDB atlas
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const db = mongoose.connection;
db.once('open', function() {
    console.log('we\'re connected!');
});
db.on('error', console.error.bind(console, 'connection error:'));


const usersRouter = require('./routes/users');
app.use('/users', usersRouter)



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

app.listen(port, () => {
    console.log(`server is runnig on: ${port}`)
  })