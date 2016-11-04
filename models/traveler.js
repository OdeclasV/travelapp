var mongoose = require('mongoose')
	Schema = mongoose.Schema

var entrySchema = new Schema({
	name: String,
	last_name: String, 
	date: String, 
	airline: String

})

var traveler = mongoose.model('traveler', entrySchema)

module.exports = traveler