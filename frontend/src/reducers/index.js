export default (state = {
	bars:{},
	user_id: '',
	message: "",
	listGoing: {},
	env_fb: "",
	env_google: ""
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
		case ('SAVE_ENV'):
			if (action.api === 'fb') {
                return {
                    ...state,
                    env_fb: action.env_var
                }
			}
			else if (action.api === 'google') {
                return {
                    ...state,
                    env_google: action.env_var
                }
			}
		default:
			return state
	}
}