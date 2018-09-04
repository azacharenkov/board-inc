import { BOARD_SELECTION, BOARD_ASSIGNMENT, BOARD_UPDATE } from './Actions.jsx';

export class BoardReducers {
    
    static boardPositionSelection(state, action) {

		var initialState = {
            position: 1,
            targetPosition: 1,
            board: null,
		}

		return (state, action) => {
		  	switch (action.type) {
		    	case BOARD_SELECTION:
		      		return Object.assign({}, state, {
                        position: action.position,
                        targetPosition: action.targetPosition
                    });
                case BOARD_ASSIGNMENT:
                case BOARD_UPDATE:
                    return Object.assign({}, state, {
                        board: action.board
                    });
		    	default:
		      		return state || initialState;
		  	}
		}
	}
}