import React, { Component } from 'react';
import {connect} from "react-redux";

import BoardPiece from './BoardPiece.js';

class Board extends Component {
    render() {
        return (
            <div className="board">
                <div className="full-line">
                    <BoardPiece index = {1}/>
                    <BoardPiece index = {2}/>
                    <BoardPiece index = {3}/>
                    <BoardPiece index = {4}/>
                    <BoardPiece index = {5}/>
                </div>

                <div className="mid-line">
                    <div className="three-line">
                        <BoardPiece index = {16}/>
                        <BoardPiece index = {15}/>
                        <BoardPiece index = {14}/>
                    </div>
                    <div className="blank-line"/>
                    <div className="three-line">
                        <BoardPiece index = {6}/>
                        <BoardPiece index = {7}/>
                        <BoardPiece index = {8}/>
                    </div>
                </div>

                <div className="full-line">
                    <BoardPiece index = {13}/>
                    <BoardPiece index = {12}/>
                    <BoardPiece index = {11}/>
                    <BoardPiece index = {10}/>
                    <BoardPiece index = {9}/>
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

export default connect(Board.mapStateToProps, null)(Board);
