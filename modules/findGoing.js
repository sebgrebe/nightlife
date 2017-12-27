var Bars = require('..//models/bars');

module.exports = function(callback) {
    Bars.find({}, function(err,going) {
        if (err) return callback({
            error: true,
            message: "Couldn't connect to database of users. Can't show who's going."
        });
        if (going) {
            return callback({
                error: false,
                message: 'Could retrieve database',
                going: going
            })
        }
    })
}