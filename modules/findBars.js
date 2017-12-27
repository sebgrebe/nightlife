var request = require('request')
var handleError = require('./handleError')

var google_api_key = 'AIzaSyCxc66OvtLFxtezLwXdsglKETDVcGSo7qg'

module.exports = function(url_places,callback) {
	//make call to Google Places API to get list of places (https://developers.google.com/places/web-service/search#PlaceSearchRequests)
	request(url_places,function(err,res,body) {
		var body_json = (typeof(body) === 'string') ? JSON.parse(body) : body
		var maxwidth = 200
		var maxheight = 200
		handleError(err,body_json, function(response) {
			if (response.error) {
				return callback(response)
			}
			else {
				var results = body_json.results;
				var bars_ids = [];
				//loop through results and put place IDs, names, and photo_reference in array of bars
				for (var i = 0; i < results.length; i++ ) {
					var result = results[i]
					var place_id = result['place_id']
					var name = result['name']
                    var formatted_address = result['formatted_address']
					var photo_url = (result['photos'] === undefined) ? (undefined) : ("https://maps.googleapis.com/maps/api/place/photo?photoreference="+result['photos'][0]['photo_reference']+'&maxwidth='+maxwidth+'&maxheight='+maxheight+'&key='+google_api_key)
                    var maps_url = "https://www.google.com/maps/place/?q=place_id:"+place_id
					var obj = {
						place_id: place_id,
						name: name,
						formatted_address: formatted_address,
						photo_url: photo_url,
						maps_url: maps_url
					}
					bars_ids.push(obj)
				}
				//return response with array of bars
				var response = {
					error: false,
					message: 'Here are the results',
					results: bars_ids
				}
				return callback(response)
			}
		})
	})	
}

