

/*
* action types
*/
export const BOARD_SELECTION = 'BOARD_SELECTION';

export class Actions {

	/*
	 * action creators
	 */
	static setPosition(position) {
	    return { type: BOARD_SELECTION, position }
    }
    
}