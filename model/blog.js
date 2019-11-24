var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Categories = require('../model/categories');

mongoose.connect('mongodb+srv://admin:Nhatlk241095@cluster0-nrygr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true , useFindAndModify: false });
var blogSchema = new Schema({
    title:  String,
    content:   String,
    subtitle: String,
    comments: [{ body: String, date: Date }],
    date:String,
    file: String,
    category: String
  });

 

  var Blog =  module.exports =  mongoose.model('Blog', blogSchema);

  