import React, { Component } from 'react';
import {connect} from "react-redux";

import building from './images/gym.png';
import baseInfo from './files/baseInfo.json';

class BoardPiece extends Component {

    state = {

    }

    getAvatar = () => {
        if(this.props.index === this.props.boardState.position) {
            return (
                <div className="avatar">
                    {/* <img src = {avatar} /> */}
                </div>
            )
        }
        return null;
    }

    render() {
        var pieceUrl = baseInfo.tiles[this.props.index-1].imageUrl;
        return (
            <div className = {"board-piece " + (this.props.index === this.props.boardState.position)}>
                <div className="piece-image">
                    <img src = {require('./images/' + pieceUrl)} />
                </div>
                <div className="piece-footer">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>
                {this.getAvatar()}
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

export default connect(BoardPiece.mapStateToProps, null)(BoardPiece);