export const update = (array) => ({
	type: 'UPDATE',
	bars: array
})

export const login = (user_id) => ({
    type: 'LOGIN',
    user_id: user_id
})

export const set_message = (message) => ({
    type: 'MESSAGE',
    message: message
})

export const set_going = (going) => ({
    type: 'GOING',
    going: going
})