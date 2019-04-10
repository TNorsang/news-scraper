// Calling Mongoose
var mongoose = require("mongoose");

// schema consrtuctor
var Schema = mongoose.Schema;

// creating a new schema object by calling the constructor
var NoteSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
