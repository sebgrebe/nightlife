export default (state = {
	bars:{},
	user_id: '',
	message: "",
	listGoing: {}
	}, action) => {
	switch (action.type) {
		case 'UPDATE':
			return {
                ...state,
                bars: action.bars
    		}
		case ('LOGIN'):
			return {
                ...state,
                user_id: action.user_id
			}
		case ('MESSAGE'):
			return {
				...state,
				message: action.message
			}
		case ('GOING'):
			return {
				...state,
				listGoing: action.going
			}
		default:
			return state
	}
}