var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://admin:Nhatlk241095@cluster0-nrygr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true });
var userSchema = new Schema({
    username: String,
  password: String,
  });

 

  var USer =  module.exports =  mongoose.model('User', userSchema);
