import React, { Component } from 'react';
import {connect} from "react-redux";

class BoardPiece extends Component {

    state = {

    }

    render() {
        return (
            <div className = {"board-piece " + (this.props.index === this.props.boardState.position)}>
                {this.props.index}
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