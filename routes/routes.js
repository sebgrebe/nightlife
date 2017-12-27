var passport = require('passport')
var findBars = require('../modules/findBars')
var findGoing = require('../modules/findGoing')
var save = require('../modules/save')

module.exports = (app) => {
    app.get('/api/going',(req,res) => {
		findGoing((response) => {
			res.send(response)
		})
    })
	app.post('/api/search', (req,res) => {
		findBars(req.body.url, (response) => {
				res.send(response)
		})
	})
	app.post('/api/save',(req,res) => {
		save(req.body,(response) => {
			res.send(response)
		})
	})

}
