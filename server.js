const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
	
var app = express();

hbs.registerPartials(__dirname + '/views/partials' );
app.set('view engine', 'hbs');


//middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	//print data in terminal
	console.log(log);

	//store data n file
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log. Sorry.');
		}	
	});

	next();	
});

//new middleware for MAINTENANCE
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

//middleware
app.use(express.static(__dirname + '/public')); 
	
//helper function takes 2 ags
//1) name of helper 2) funct to run
//The return of this function is what we are going to render 
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

//dummy helper
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//handlers
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page!',
		welcomeMessage: 'Welcome to My Jimmy Page',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

//request for when a resquest fails in /bad
//send back JSON with errorMessage
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});	


//app hast to be 'listening'
app.listen(3002, () => {
	console.log('Server running on port 3002');
});	