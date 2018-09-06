import { BOARD_SELECTION, BOARD_ASSIGNMENT, 
    BOARD_UPDATE, ROLL, PURCHASE, GAIN } from './Actions.jsx';

export class BoardReducers {
    
    static boardPositionSelection(state, action) {

		var initialState = {
            position: 1,
            rolled: [0, 0, 0, 0, 0, 0],
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
                case ROLL:
                    var newRolls = state.rolled;
                    newRolls.unshift(action.number);
                    newRolls.pop();
                    return Object.assign({}, state, {
                        rolled: newRolls
                    });
                case PURCHASE:
                    var board = state.board;
                    board.tiles[action.index].bought = board.tiles[action.index].bought + action.buildings;
                    return Object.assign({}, state, {
                        board: board
                    });
		    	default:
		      		return state || initialState;
		  	}
		}
    }
    
    static wallet(state, action) {

		var initialState = {
            owned: 200,
		}

		return (state, action) => {
		  	switch (action.type) {
                case PURCHASE:
                    var owned = state.owned;
                    if(owned >= action.cost) {
                        owned = owned - action.cost;
                    }
		      		return Object.assign({}, state, {
                        owned: owned
                    });
                case GAIN:
                    return Object.assign({}, state, {
                        owned: (state.owned + action.amount)
                  });
		    	default:
		      		return state || initialState;
		  	}
		}
	}
}