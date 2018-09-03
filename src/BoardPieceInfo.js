import React, { Component } from 'react';
import {connect} from "react-redux";

import board from './files/board.json';

class BoardPieceInfo extends Component {

    state = {

    }

    render() {

        var boardPiece = board.tiles[this.props.boardState.position];

        return (
            <div className = {"board-piece-info"}>
                <div className="title">
                    {boardPiece.name}
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