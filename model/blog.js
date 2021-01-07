var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Categories = require('../model/categories');

mongoose.connect('mongodb+srv://haycuoilennao3:Nhatlk@@241095@cluster0.dhzit.mongodb.net/Japan-blog?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true , useFindAndModify: false });
var blogSchema = new Schema({
    title:  String,
    content:   String,
    subtitle: String,
    comments: [{ body: String, date: Date }],
    date:String,
    file: String,
    category: String,
    slug:String
  });

 

  var Blog =  module.exports =  mongoose.model('Blog', blogSchema);

  