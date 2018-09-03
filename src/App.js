import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import logo from './logo.svg';
import './App.css';

import Board from './Board.js';
import Dice from './Dice.js';

class App extends Component {

    movePosition = (dice) => {
        this.timerHandler = setTimeout(()=> this.movePosTimeOut(1, dice), 250);
    }

    movePosTimeOut = (by, to) => {
        if(to === 0 && this.timerHandler) {
            clearTimeout(this.timerHandler);
            this.timerHandler = 0;
        } else {
            var pos = (this.props.boardState.position + by) % 17;
            if(pos === 0) {
                pos++;
            }
            this.props.changePosition(pos);
            this.timerHandler = setTimeout(()=> this.movePosTimeOut(1, --to), 250);
        }
    }

    componentWillUnmount() {
        // If timer handler is defined - clear the timeout
        // so it would stop calling the method after this view was removed
        if (this.timerHandler) {
            clearTimeout(this.timerHandler);
            this.timerHandler = 0;
        }
    }

    render() {
        return (
            <div className="app">
                <Board />
                <Dice movePosition = {this.movePosition}/>
            </div>
        );
    }

    /*
    * Maps properties to dispatch methods to send actions to the store reducers
    */
    static mapDispatchToProps(dispatch) {
        return {
            changePosition: (position) => {
                dispatch(Actions.setPosition(position));
            }
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

export default connect(App.mapStateToProps, App.mapDispatchToProps)(App);