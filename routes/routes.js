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
	app.get('/api/env/fb',(req,res) => {
		res.send(process.env.FB_APP_ID)
	})
    app.get('/api/env/google',(req,res) => {
        res.send(process.env.GOOGLE_API_KEY)
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
