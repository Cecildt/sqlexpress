var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    edgeapi = require('./routes/edgeapi');

var app = module.exports = express(),
    port = process.env.PORT || 1337;

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });

    app.set('env', 'development');
    app.use(express.cookieParser());
    app.use(express.session({ secret: '70535383-AA81-4D5D-8BAE-DEE593EED9C4' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.csrf());

    if (process.env.SESSIONNAME === 'Console') {
        // this is to make sure express does not serve static files when in IIS
        app.use(express.static(__dirname + '/public'));
    }
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// CSRF
function csrf(req, res, next) {
    res.locals.token = req.session._csrf;
    next();
}

// Routes
app.get('/', csrf, routes.index);

// Native SQL module using ODBC
app.get('/api/status', api.status);

// Edge SQL module using ADO.NEt
app.get('/edgeapi/status', edgeapi.status);

// Start server
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
