
var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 11.0};Server={(local)};Database={AdventureWorks2012};Trusted_Connection={Yes};";

exports.status = function(req, res) {
    res.json({
        status: "online" 
    });
};

exports.streamquery = function(req, res) {
    var stmt = sql.query(conn_str, "SELECT TOP 10 * FROM Person.Person");
    stmt.on('meta', function (meta) {
        console.log("We've received the metadata");
        res.json({
            meta: meta
        });
    });

    stmt.on('row', function (idx) {
        console.log("We've started receiving a row");
        res.json({
            row: idx
        });
    });

    stmt.on('column', function (idx, data, more) {
        console.log(idx + ":" + data);
        res.json({
            column: idx + ":" + data
        });
    });

    stmt.on('done', function () {
        console.log("All done!");
        res.json({
            status: "All done!"
        });
    });

    stmt.on('error', function (err) {
        console.log("We had an error :-( " + err);
        res.json({
            error: "We had an error :-( " + err
        });
    });

    res.json({
        status: "stream done."
    });
};