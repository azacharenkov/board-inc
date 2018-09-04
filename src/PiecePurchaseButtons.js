import React, { Component } from 'react';
import {connect} from "react-redux";

class PiecePurchaseButtons extends Component {

    state = {

    }

    render() {

        if(this.props.boardState.board === null) {
            return (
                <div className = "board-piece-purchase"/>
            )
        }

        var boardPiece = this.props.boardState.board.tiles[this.props.boardState.position - 1];

        return (
            <div className = "board-piece-purchase">
                {this.getButtons()}
            </div>
        );
    }

    getButtons = () => {
        var btns = [];

        btns.push(
            <div className="purchase-btn">
                <div className="amount">x1</div>
                <div className="cost">0.5</div>
            </div>
        );

        btns.push(
            <div className="purchase-btn">
                <div className="amount">x10</div>
                <div className="cost">60</div>
            </div>
        );

        btns.push(
            <div className="purchase-btn">
                <div className="amount">x100</div>
                <div className="cost">800</div>
            </div>
        );

        return btns;
    }

    /*
    * Maps state from the store to properties used by this class
    */
    static mapStateToProps(store) {
        return {
            boardState: store.boardState
        }
    }
}

export default connect(PiecePurchaseButtons.mapStateToProps, null)(PiecePurchaseButtons);