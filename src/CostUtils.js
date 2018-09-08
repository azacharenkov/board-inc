import React, {Component} from 'react';

import baseInfo from './files/baseInfo.json';
import buildInfo from './files/buildInfo.json';

export class CostUtils extends Component {

    static isPurchasable(index) {
        return baseInfo.tiles[index].purchasable;
    }

    static getTileName(index) {
        return baseInfo.tiles[index].name;
    }

    static getTileDescription(index) {
        return buildInfo.tiles[index].info;
    }

    static costOf(boardState, amount) {

        // Get the piece info from the json file
        var p = boardState.position - 1;
        var pieceInfo = boardState.board.tiles[p];
        var pieceBase = baseInfo.tiles[p];
        var o = pieceInfo.bought;
        var bp = pieceBase.basePrice;

        switch(p) {
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
                if(amount === 1) {
                    return (bp) * Math.pow((1.15 + (p/1000)), o);
                }
                return this.calculateDiscount(amount) * bp * (this.calculateSumOf(amount + o, 1.15 + (p/1000)) - this.calculateSumOf(o, 1.15 + (p/1000)));
                
            default:
                return 0;
        }
    }

    static calculateDiscount(amountBuying) {
        return 1 - Math.min(0.1, (amountBuying / 10) * 0.0001);
    }

    static calculateSumOf(n, base) {
        return (Math.pow(base, n+1)/(base - 1));
    }

    static toExponential(number) {
        if(number < 1000) {
            return parseFloat(number).toFixed(2);
        }
        var exp = number.toExponential(3);
        return exp.replace("+", "");
    }
}