import React, {Component} from 'react';

import baseInfo from './files/baseInfo.json';

export class CostUtils extends Component {

    static costOf(index, amount) {

        // Get the piece info from the json file
        var pieceInfo = baseInfo.tiles[index];

        switch(index) {
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
            default:
                return 0;
        }
    }
}