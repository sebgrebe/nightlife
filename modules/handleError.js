module.exports = function(err,body,callback) {
    console.log(err)
	var response;
	if (err) {
		response = {
					error: true,
					message: err
				}
		}
	else if (body.status !== 'OK') {
		var error_message = (body.error_message === '') ? 'An error occurred' : body.error_message
		response = {
			error: true,
			message: error_message
		}
	}
	else {
		response = {
			error: false
		}
	}
	return callback(response)
}