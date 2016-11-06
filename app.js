//Adding dependencies
var express = require('express')
var bodyParser = require('body-parser')
var handlebrs = require('express-handlebars')

//Connecting to my DB using Mongoose
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/traveler')

//Adding my model 
var Traveler = require('./models/traveler.js')

//Initializing my app
var app = express()


//Using template engine
app.engine('handlebars', handlebrs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', __dirname + "/views")

//Connecting with css file (main.css)
app.use(express.static(__dirname + '/public'))

//Using Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

 
app.get('/', function( req, res ){

	res.render('home')
})

app.get('/person_info', function(req,res){
	res.render('person_info')
})

app.get('/person_entry', function(req,res){
	res.render('person_entry')
})

app.get('/person_info/:id', function(req,res){

	var travelerId = req.params.id
	Traveler.findOne({'_id': travelerId})
	.exec(function(err, traveler){
		
		if(err) {
			console.log("error has occured")
		} else {
			res.render('person_info', traveler)
		}
	})
	
})

app.post('/person_entry', function(req,res){

	var currentTraveler = new Traveler({
		name: req.body.name,
		last_name: req.body.last_name,
		date: req.body.date,
		airline: req.body.airline
	})

	currentTraveler.save()

	res.redirect('/person_info/' + currentTraveler._id)
})

app.get('*', function( req, res){
	res.send("Page not found 404")
})




app.listen(3000)
console.log("Sever running on port 3000")