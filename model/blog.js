var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://admin:Nhatlk241095@cluster0-nrygr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true });
var blogSchema = new Schema({
    title:  String,
    content:   String,
    subtitle: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    file: String
  });

 

  var Blog =  module.exports =  mongoose.model('Blog', blogSchema);

  module.exports.findAllArticle =   function(err, data) {
 
  }