var Bars = require('../models/bars');

module.exports = function(obj,callback) {
    var place_id = obj.place_id
    var user_id = obj.user_id
    var going = obj.going
    Bars.findOne({ 'place_id': place_id}, function(err,bar) {
        if (err) return callback({
            error: true,
            message: err+" You couldn't be saved as going"
        });
        else if (!bar) {
            var newBar = Bars()
            newBar.place_id = place_id
            newBar.going = [user_id]
            newBar.save((err) => {
                if (err) return callback({
                    error: true,
                    message: err+" You couldn't be saved as going"
                })
                else {
                    return callback({
                        error: false,
                        message: 'You were saved as going'
                    })
                }
            })
        }
        else {
            if (going === 'going') {
                bar.going.push(user_id)
                bar.save()
            }
            else {
                let bar_going = bar.going
                bar_going.map((user_id_going) => {
                    if (user_id_going === user_id) {
                        bar_going.splice(bar_going.indexOf(user_id_going),1)
                    }
                })
                bar.going = bar_going
                bar.save()
            }
            return callback({
                error: false,
                message: 'You were saved as '+going
            })
        }
    })
}

