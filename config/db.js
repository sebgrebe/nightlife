console.log(process.env.NODE_ENV)
var db_url = 'mongodb://localhost:27017/nightlife' || 'mongodb://heroku_6tx14993:lpnk0lmir126cvb4arnj3hquji@ds131997.mlab.com:31997/heroku_6tx14993'

module.exports = {
    'url': db_url
}