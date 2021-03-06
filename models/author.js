var mongoose = require('mongoose');
var moment = require ('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  if (this.date_of_death instanceof Date && this.date_of_birth instanceof Date) {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  } else {
    return '';
  }
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('Do MMMM YYYY') : '';
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('Do MMMM YYYY') : '';
  //return moment(this.date_of_death).format('Do MMMM YYYY');
});


//Export model
module.exports = mongoose.model('author', AuthorSchema);