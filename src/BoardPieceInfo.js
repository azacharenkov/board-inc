import React, { Component } from 'react';
import {connect} from "react-redux";

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

        return (
            <div className = {"board-piece-info"}>
                <div className="title">
                    {boardPiece.name}
                </div>
                <div>
                    {"Visited: " + boardPiece.visited}
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