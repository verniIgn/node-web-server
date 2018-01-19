const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
	
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
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
	
//helper
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

//handlers
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Node Web Server',
		welcomeMessage: 'Welcome! This simple page is being runned by a Web Server I made with Node.js, Express, and Handlebars.',
		details: 'The server also creates a log file that keeps track of the http activity on the site.' 
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});	

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});	