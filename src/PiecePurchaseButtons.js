import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import {CostUtils} from './CostUtils.js';

class PiecePurchaseButtons extends Component {

    state = {

    }

    getButtonsDiv = () => {
        if(this.props.boardState.board !== null && CostUtils.isPurchasable(this.props.boardState.position - 1)) {
            var boardPiece = this.props.boardState.board.tiles[this.props.boardState.position - 1];
            return (
                <div className = "board-piece-purchase">
                    {this.getButtons()}
                </div>
            );
        }
        return null;
    }

    render() {

        return (
            <div className="under-board">
                <div className = "purchase-buttons">
                    {this.getButtonsDiv()}
                </div>
                <div className="building-info">
                    {CostUtils.getTileDescription(this.props.boardState.position - 1)}
                </div>
            </div>
        )
    }

    getButtons = () => {
        var btns = [];

        let costForOne = CostUtils.costOf(this.props.boardState, 1);
        let costForTen = CostUtils.costOf(this.props.boardState, 10);
        let costForHund = CostUtils.costOf(this.props.boardState, 100);

        var wallet = this.props.walletState.owned;

        btns.push(
            <div className={"purchase-btn " + (wallet >= costForOne)} 
            onClick = {(e) => this.purchase(costForOne, wallet, 1)}>
                <div className="amount">x1</div>
                <div className="cost">{CostUtils.toExponential(costForOne)}</div>
            </div>
        );

        btns.push(
            <div className={"purchase-btn " + (wallet >= costForTen)} 
            onClick = {(e) => this.purchase(costForTen, wallet, 10)}>
                <div className="amount">x10</div>
                <div className="cost">{CostUtils.toExponential(costForTen)}</div>
            </div>
        );

        btns.push(
            <div className={"purchase-btn " + (wallet >= costForHund)} 
            onClick = {(e) => this.purchase(costForHund, wallet, 100)}>
                <div className="amount">x100</div>
                <div className="cost">{CostUtils.toExponential(costForHund)}</div>
            </div>
        );

        return btns;
    }

    purchase = (cost, wallet, amount) => {
        if(wallet >= cost) {
            this.props.purchase(cost, this.props.boardState.position - 1, amount)
        }
    }

    /*
    * Maps properties to dispatch methods to send actions to the store reducers
    */
    static mapDispatchToProps(dispatch) {
        return {
            purchase: (cost, index, buildings) => {
                dispatch(Actions.purchase(cost, index, buildings));
            },
        }
    }

    /*
    * Maps state from the store to properties used by this class
    */
    static mapStateToProps(store) {
        return {
            boardState: store.boardState,
            walletState: store.walletState
        }
    }
}

export default connect(PiecePurchaseButtons.mapStateToProps, PiecePurchaseButtons.mapDispatchToProps)(PiecePurchaseButtons);