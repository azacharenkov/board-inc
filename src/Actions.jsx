

/*
* action types
*/
export const BOARD_SELECTION = 'BOARD_SELECTION';

export const BOARD_ASSIGNMENT = 'BOARD_ASSIGNMENT';
export const BOARD_UPDATE = 'BOARD_UPDATE';

export class Actions {

	/*
	 * action creators
	 */
	static setPosition(position, targetPosition) {
	    return { type: BOARD_SELECTION, position, targetPosition }
    }

	static setBoard(board) {
	    return { type: BOARD_ASSIGNMENT, board }
    }

    static updateBoard(board) {
	    return { type: BOARD_UPDATE, board }
    }
    
}