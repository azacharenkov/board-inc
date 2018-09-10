import { BOARD_SELECTION, BOARD_ASSIGNMENT, 
    BOARD_UPDATE, ROLL, PURCHASE, GAIN, ACHIEVEMENT,
    GAIN_PERCENTAGE, GAIN_MOVES, UPGRADE } from './Actions.jsx';

    import boardTiles from './files/board.json';

export class BoardReducers {
    
    static loadInitialState() {
        var board = boardTiles;
        var position = 1;
        var moves = 0;
        var achieved = [];
        var rolled = [0, 0, 0, 0, 0, 0];
        var upgrades = [];
        if(localStorage.board && localStorage.board !== null) {
            board = JSON.parse(localStorage.board);
            position = parseInt(localStorage.position);
        }
        if(localStorage.moves && localStorage.moves !== null) {
            moves = parseInt(localStorage.moves);
        }
        if(localStorage.achieved && localStorage.achieved !== null) {
            achieved = localStorage.achieved.split(",");
        }
        if(localStorage.rolled && localStorage.rolled !== null) {
            rolled = localStorage.rolled.split(",");
        }
        if(localStorage.upgrades && localStorage.upgrades !== null) {
            upgrades = localStorage.upgrades.split(",");
        }

        return {
            position: position,
            moves: moves,
            rolled: rolled,
            targetPosition: position,
            board: board,
            achieved: achieved,
            upgrades: upgrades,
            type: ""
		}
    }

    static boardPositionSelection(state, action) {

		var initialState = this.loadInitialState();

		return (state, action) => {
		  	switch (action.type) {
		    	case BOARD_SELECTION:
		      		return Object.assign({}, state, {
                        position: action.position,
                        targetPosition: action.targetPosition,
                        type: action.type
                    });
                case BOARD_ASSIGNMENT:
                case BOARD_UPDATE:
                    return Object.assign({}, state, {
                        board: action.board,
                        type: action.type
                    });
                case ROLL:
                    var newRolls = state.rolled;
                    newRolls.unshift(action.number);
                    newRolls.pop();
                    var moves = state.moves + 1;
                    return Object.assign({}, state, {
                        rolled: newRolls,
                        moves: moves,
                        type: action.type
                    });
                case PURCHASE:
                    var board = state.board;
                    board.tiles[action.index].bought = board.tiles[action.index].bought + action.buildings;
                    return Object.assign({}, state, {
                        board: board,
                        type: action.type
                    });
                case GAIN_MOVES :
                    var moves = state.moves;
                    moves = Math.ceil(moves + (moves * action.percentage));
                    return Object.assign({}, state, {
                        moves: moves,
                        type: action.type
                    });
                case ACHIEVEMENT:
                    var achs = state.achieved;
                    achs.push(action.ach);
                    return Object.assign({}, state, {
                        achieved: achs,
                        type: action.type
                    });
                case UPGRADE:
                    var upgs = state.upgrades;
                    upgs.push(action.upg);
                    return Object.assign({}, state, {
                        upgrades: upgs,
                        type: action.type
                    });
		    	default:
		      		return state || initialState;
		  	}
		}
    }
    
    static loadWallet() {
        var owned = 200;
        if(localStorage.wallet && localStorage.wallet !== null) {
            owned = parseInt(localStorage.wallet);
        }

        return {
            owned: owned,
        };
    }

    static wallet(state, action) {

		var initialState = this.loadWallet();

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
                case GAIN_PERCENTAGE:
                    var owned = state.owned;
                    owned = owned + (owned * action.percentage);
                    return Object.assign({}, state, {
                        owned: owned
                });
		    	default:
		      		return state || initialState;
		  	}
		}
	}
}