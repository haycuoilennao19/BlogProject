var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://haycuoilennao3:Nhatlk@@241095@cluster0.dhzit.mongodb.net/Japan-blog?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true });
var categoriesSchema = new Schema({
    category: String
  });

 

  var Categories =  module.exports =  mongoose.model('Categories', categoriesSchema);