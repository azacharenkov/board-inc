import React, {Component} from 'react';

import baseInfo from './files/baseInfo.json';

export class CostUtils extends Component {

    static isPurchasable(index) {
        return baseInfo.tiles[index].purchasable;
    }

    static costOf(boardState, amount) {

        // Get the piece info from the json file
        var position = boardState.position - 1;
        var pieceInfo = boardState.board.tiles[position];
        var pieceBase = baseInfo.tiles[position];

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
                return (pieceBase.basePrice + position) * Math.pow((1.15 + (position/1000)), pieceInfo.bought);
            default:
                return 0;
        }
    }
}