import { BOARD_SELECTION } from './Actions.jsx';

export class BoardReducers {
    
    static boardPositionSelection(state, action) {

		var initialState = {
            position: 1
		}

		return (state, action) => {
		  	switch (action.type) {
		    	case BOARD_SELECTION:
		      		return Object.assign({}, state, {
		        		position: action.position
                      })
		    	default:
		      		return state || initialState;
		  	}
		}
	}
}