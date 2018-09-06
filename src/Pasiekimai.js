import React, { Component } from 'react';
import {connect} from "react-redux";

import achievemnts from './files/achievements.json';

class Pasiekimai extends Component {

    state = {

    }

    render() {
        return (
            <div>
                {this.props.boardState.rolled}
                {"M: " + this.props.boardState.moves}
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

export default connect(Pasiekimai.mapStateToProps, null)(Pasiekimai);