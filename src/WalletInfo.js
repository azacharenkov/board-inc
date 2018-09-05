import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import baseInfo from './files/baseInfo.json';

class WalletInfo extends Component {

    state = {

    }

    componentDidMount() {
        this.incomeHandler = setTimeout(()=> this.collectIncome(), 1000);
    }

    collectIncome = () => {
        if(this.props.boardState.board !== null) {
            var income = 0;
            for (var i = 0; i < this.props.boardState.board.tiles.length; i++) {
                var tile = this.props.boardState.board.tiles[i];
                var baseTile = baseInfo.tiles[i];
                income += (tile.bought * baseTile.baseIncome);
            }
            this.props.gain(income);
        }
        this.incomeHandler = setTimeout(()=> this.collectIncome(), 1000);
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
            <div className = "wallet-state">
                {this.props.walletState.owned}
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