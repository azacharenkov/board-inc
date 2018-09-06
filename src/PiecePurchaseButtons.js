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
        return this.getButtonsDiv();
    }

    getButtons = () => {
        var btns = [];

        let costForOne = CostUtils.costOf(this.props.boardState, 1);

        btns.push(
            <div className="purchase-btn" onClick = {(e) => this.props.purchase(costForOne, this.props.boardState.position - 1, 1)}>
                <div className="amount">x1</div>
                <div className="cost">{parseFloat(costForOne).toFixed(2)}</div>
            </div>
        );

        // btns.push(
        //     <div className="purchase-btn">
        //         <div className="amount">x10</div>
        //         <div className="cost">{parseFloat(CostUtils.costOf(this.props.boardState.position - 1, 10)).toFixed(2)}</div>
        //     </div>
        // );

        // btns.push(
        //     <div className="purchase-btn">
        //         <div className="amount">x100</div>
        //         <div className="cost">{parseFloat(CostUtils.costOf(this.props.boardState.position - 1, 100)).toFixed(2)}</div>
        //     </div>
        // );

        return btns;
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