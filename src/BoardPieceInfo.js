import React, { Component } from 'react';
import {connect} from "react-redux";

import building from './images/bank.png';

import baseInfo from './files/baseInfo.json';

class BoardPieceInfo extends Component {

    state = {

    }

    render() {

        if(this.props.boardState.board === null) {
            return (
                <div className = {"board-piece-info"}/>
            )
        }

        var boardPiece = this.props.boardState.board.tiles[this.props.boardState.position - 1];
        var pieceUrl = baseInfo.tiles[this.props.boardState.position - 1].imageUrl;

        return (
            <div className = {"board-piece-info"}>
                <div className="title">
                    {boardPiece.name}
                </div>
                <div className="piece-info-image">
                    <img src ="" alt="i" />
                </div>
                <div className="footer">
                    <div className="visited">
                        {boardPiece.visited}
                    </div>
                    <div className="owned">
                        {boardPiece.bought}
                    </div>
                </div>
            </div>
        );
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

export default connect(BoardPieceInfo.mapStateToProps, null)(BoardPieceInfo);