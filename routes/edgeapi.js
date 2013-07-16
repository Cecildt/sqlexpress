
var edge = require('edge');

exports.status = function (req, res) {
    res.json({
        status: "online"
    });
};

exports.persons = function (req, res) {
    var getTop10Person = edge.func('sql', function () {/*
                            SELECT TOP 10 * FROM Person.Person 
                        */});

    getTop10Person(null, function (error, result) {
        if (error) {
            res.json({
                error: error
            });
        }

        console.log(result);

        res.json({
            persons: result
        });
    });
};



