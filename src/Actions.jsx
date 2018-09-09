

/*
* action types
*/
export const BOARD_SELECTION = 'BOARD_SELECTION';

export const ROLL = 'ROLL';

export const BOARD_ASSIGNMENT = 'BOARD_ASSIGNMENT';
export const BOARD_UPDATE = 'BOARD_UPDATE';

export const PURCHASE = 'PURCHASE';
export const GAIN = 'GAIN';

export const ACHIEVEMENT = 'ACHIEVEMENT';

export const GAIN_PERCENTAGE = "GAIN_PERCENTAGE";
export const GAIN_MOVES = "GAIN_MOVES";

export const UPGRADE = "UPGRADE";

export class Actions {

	/*
	 * action creators
	 */
	static setPosition(position, targetPosition) {
	    return { type: BOARD_SELECTION, position, targetPosition }
    }

    static roll(number) {
        return { type: ROLL, number }
    }

	static setBoard(board) {
	    return { type: BOARD_ASSIGNMENT, board }
    }

    static updateBoard(board) {
	    return { type: BOARD_UPDATE, board }
    }

    static purchase(cost, index, buildings) {
	    return { type: PURCHASE, cost, index, buildings }
    }
    
    static gain(amount) {
	    return { type: GAIN, amount }
    }

    static achieve(ach) {
	    return { type: ACHIEVEMENT, ach }
    }

    static upgrade(upg) {
	    return { type: UPGRADE, upg }
    }

    static gainPercentage(percentage) {
	    return { type: GAIN_PERCENTAGE, percentage }
    }

    static gainMoves(percentage) {
	    return { type: GAIN_MOVES, percentage }
    }
}