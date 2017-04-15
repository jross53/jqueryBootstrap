console.log('Loading server...');
const WEB = `${__dirname}/web`;

let express = require('express'); //Require the official name of the module, and you will put the contents of that module into a variable of the same name
let app = express(); //created an app express

//load express third-party middleware modules
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let rest = require('./TweetREST');
let colors = require('colors');
let winston = require('winston');
let nconf = require('nconf');
let mongoDAO = require('./mongoDAO');

let servingStaticFilesMessage = 'servingStaticFiles';

nconf.defaults({
    'servingStaticFiles': 'Serving static files'
});

app.use(logger('dev')); //go get this middleware and run an instance of it //basically a plug in
app.use(compression());
app.use(favicon(`${WEB}/favicon.jpg`));
app.use('/', rest);

//Serve up static files //really middleware, but included instead of third party
app.use(express.static(WEB));

//Use nconf, colors and winston modules
console.log(nconf.get(servingStaticFilesMessage).red);
winston.log('info', nconf.get(servingStaticFilesMessage));

//start server
app.listen(8080, function () { //if localhost is not defined in host file, just use 127.0.0.1

    console.log('Listening on port 8080');
});

mongoDAO.setUpDbWithTweets();