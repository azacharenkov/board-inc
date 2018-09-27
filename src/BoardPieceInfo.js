import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import building from './images/bank.png';

import baseInfo from './files/baseInfo.json';

import {CostUtils} from './CostUtils.js';

class BoardPieceInfo extends Component {

    state = {

    }

    componentDidUpdate() {
        console.log(this.props);
        if(this.props.boardState.type === "BOARD_SELECTION") {
            if(this.props.boardState.position === this.props.boardState.targetPosition) {
                var info = baseInfo.tiles[this.props.boardState.position - 1];
                if(!info.purchasable) {
                    if(info.enum === "TAX") {
                        this.props.gainPercentage(-0.5)
                    } else if(info.enum === "JAIL") {
                        this.props.gainMoves(-0.25)
                    } else if(info.enum === "GO") {
                        var percentToGain = 0.1 * (this.props.boardState.board.tiles[this.props.boardState.position - 1].visited + 1);
                        this.props.gainPercentage(percentToGain)
                    }
                }
            } else if(baseInfo.tiles[this.props.boardState.position - 1].enum === "GO"){
                this.updateBoardElement();
                var percentToGain = 0.1 * (this.props.boardState.board.tiles[this.props.boardState.position - 1].visited + 1);
                this.props.gainPercentage(percentToGain)
            }
        }
    }

    updateBoardElement = () => {
        var board = this.props.boardState.board;
        board.tiles[this.props.boardState.position - 1].visited++;
        this.props.updateBoard(board);
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
                    {CostUtils.getTileName(this.props.boardState.position - 1)}
                </div>
                <div className="piece-info-image">
                    <img src = {require('./images/' + pieceUrl)} />
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
    * Maps properties to dispatch methods to send actions to the store reducers
    */
    static mapDispatchToProps(dispatch) {
        return {
            gainPercentage: (perc) => {
                dispatch(Actions.gainPercentage(perc));
            },
            gainMoves: (perc) => {
                dispatch(Actions.gainMoves(perc));
            },
            updateBoard: (board) => {
                dispatch(Actions.updateBoard(board));
            },
        }
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

export default connect(BoardPieceInfo.mapStateToProps, BoardPieceInfo.mapDispatchToProps)(BoardPieceInfo);