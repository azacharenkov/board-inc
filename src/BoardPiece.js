import React, { Component } from 'react';
import {connect} from "react-redux";

import avatar from './images/dog.png';

class BoardPiece extends Component {

    state = {

    }

    getAvatar = () => {
        if(this.props.index === this.props.boardState.position) {
            return (
                <div className="avatar">
                    <img src = {avatar} />
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className = {"board-piece " + (this.props.index === this.props.boardState.position)}>
                <div className="title">
                    {this.props.index}
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