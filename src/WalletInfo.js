import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import baseInfo from './files/baseInfo.json';

import {CostUtils} from './CostUtils.js';

class WalletInfo extends Component {

    state = {

    }

    componentDidMount() {
        this.incomeHandler = setTimeout(()=> this.collectIncome(), 1000);
    }

    collectIncome = () => {
        var multiplier = 1;
        if(this.props.boardState.board !== null) {
            var income = this.props.boardState.baseIncome;
            for (var i = 0; i < this.props.boardState.board.tiles.length; i++) {
                var tile = this.props.boardState.board.tiles[i];
                var baseTile = baseInfo.tiles[i];
                income += (tile.bought * baseTile.baseIncome);
                if(baseTile.enum === "MESEUM" && tile.bought > 0) {
                    multiplier = multiplier + (tile.bought * 0.001 * this.props.boardState.achieved.length);
                }
                else if(baseTile.enum === "GYM" && tile.bought > 0) {
                    multiplier = multiplier + (tile.bought * 0.001 * this.props.boardState.moves);
                }
                else if(baseTile.enum === "CITY_HALL" && tile.bought > 0) {
                    multiplier = multiplier + (tile.bought * 0.0002 * this.totalBought());
                }
            }
            income *= multiplier;
            this.props.gain(income);
        }
        this.incomeHandler = setTimeout(()=> this.collectIncome(), 1000);
    }

    totalBought = () => {
        var total = 0;
        for (var i = 0; i < this.props.boardState.board.tiles.length; i++) {
            var tile = this.props.boardState.board.tiles[i];
            total += tile.bought;
        }
        return total;
    }

    getIncomePerSecond = () => {
        var income = this.props.boardState.baseIncome;
        var multiplier = 1;
        if(this.props.boardState.board !== null) {
            for (var i = 0; i < this.props.boardState.board.tiles.length; i++) {
                var tile = this.props.boardState.board.tiles[i];
                var baseTile = baseInfo.tiles[i];
                income += (tile.bought * baseTile.baseIncome);
                if(baseTile.enum === "MESEUM" && tile.bought > 0) {
                    multiplier = multiplier + (tile.bought * 0.001 * this.props.boardState.achieved.length);
                }
                else if(baseTile.enum === "GYM" && tile.bought > 0) {
                    multiplier = multiplier + (tile.bought * 0.001 * this.props.boardState.moves);
                }
                else if(baseTile.enum === "CITY_HALL" && tile.bought > 0) {
                    multiplier = multiplier + (tile.bought * 0.0002 * this.totalBought());
                }
            }
        }
        return income * multiplier;
    }

    componentWillUnmount() {
        // If timer handler is defined - clear the timeout
        // so it would stop calling the method after this view was removed
        if (this.incomeHandler) {
            clearTimeout(this.incomeHandler);
            this.incomeHandler = 0;
        }
    }

    render() {
        return (
            <div className="income-div">
                <div className = "wallet-state">
                    {CostUtils.toExponential(this.props.walletState.owned)}
                </div>
                <div className = "income-per-sec">
                    {CostUtils.toExponential(this.getIncomePerSecond()) + "/s"}
                </div>
            </div>
        );
    }

    /*
    * Maps properties to dispatch methods to send actions to the store reducers
    */
    static mapDispatchToProps(dispatch) {
        return {
            gain: (amount) => {
                dispatch(Actions.gain(amount));
            },
        }
    }

    /*
    * Maps state from the store to properties used by this class
    */
    static mapStateToProps(store) {
        return {
            walletState: store.walletState,
            boardState: store.boardState
        }
    }
}

export default connect(WalletInfo.mapStateToProps, WalletInfo.mapDispatchToProps)(WalletInfo);