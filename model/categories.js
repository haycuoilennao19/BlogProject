var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://admin:Nhatlk241095@cluster0-nrygr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true });
var categoriesSchema = new Schema({
    category: String
  });

 

  var Categories =  module.exports =  mongoose.model('Categories', categoriesSchema);