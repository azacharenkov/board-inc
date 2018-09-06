import React, {Component} from 'react';

import baseInfo from './files/baseInfo.json';

export class CostUtils extends Component {

    static costOf(index, amount) {
    static costOf(boardState, amount) {

        // Get the piece info from the json file
<<<<<<< HEAD
        var pieceInfo = baseInfo.tiles[index];
=======
        var position = boardState.position - 1;
        var pieceInfo = boardState.board.tiles[position];
>>>>>>> 64eccd4ee0d24807737664d86506866bf8d280fd

        switch(index) {
        switch(position) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                return (55 + index) * Math.pow((1.07 + (index/1000)), amount);
                return (55 + position) * Math.pow((1.07 + (position/1000)), pieceInfo.bought);
            default:
                return 0;
        }
    }
}