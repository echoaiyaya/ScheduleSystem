const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://Jinqian:321654@cluster0.0bq01.mongodb.net/schedules?retryWrites=true&w=majority';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {            
  console.log(`Mongoose connected to ${dbURI}`);       
});                                                    
mongoose.connection.on('error', err => {               
  console.log('Mongoose connection error:', err);      
});                                                    
mongoose.connection.on('disconnected', () => {         
  console.log('Mongoose disconnected');                
});          

require('./groups');
require('./customers');
require('./workers');
require('./timetables');
require('./appointments');
require('./categories');
require('./admins');