var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://haycuoilennao3:Nhatlk@@241095@cluster0.dhzit.mongodb.net/Japan-blog?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true });
var userSchema = new Schema({
    username: String,
  password: String,
  });

 

  var USer =  module.exports =  mongoose.model('User', userSchema);
