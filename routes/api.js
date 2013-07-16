
var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 11.0};Server={(local)};Database={AdventureWorks2012};Trusted_Connection={Yes};";

exports.status = function(req, res) {
    res.json({
        status: "online" 
    });
};

exports.streamquery = function(req, res) {
    var stmt = sql.query(conn_str, "SELECT * from Person.Person");
    stmt.on('meta', function (meta) { console.log("We've received the metadata"); });
    stmt.on('row', function (idx) { console.log("We've started receiving a row"); });
    stmt.on('column', function (idx, data, more) { console.log(idx + ":" + data); });
    stmt.on('done', function () { console.log("All done!"); });
    stmt.on('error', function (err) { console.log("We had an error :-( " + err); });
};