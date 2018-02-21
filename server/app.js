const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const passport=require('passport');
const mongoose=require('mongoose');
const cors=require('cors');
const users=require('./routes/users')
const config=require('./config/database')

const app= express();
const port= 8080;
//connection to database
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
console.log('Connected to Database'+config.database);
});
app.use(cors());
app.use(bodyParser.json());
//passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(express.static(path.join(__dirname, 'client')));
app.use('/', users)
app.get('/', (req, res)=>{
    res.send('Invalid Endpoint');
});
app.listen(port, ()=>{
console.log('Server Started on port' +port); 
});
