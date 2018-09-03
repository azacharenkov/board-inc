import {createStore, combineReducers} from 'redux';
import {BoardReducers} from './BoardReducers.jsx';

export class AppStore {

    /*
     * Get the store
     */
    static getStore() {

        // Combine Reducers
        var reducers = combineReducers({
            boardState: BoardReducers.boardPositionSelection(),
        });


        return createStore(reducers);
    }
}