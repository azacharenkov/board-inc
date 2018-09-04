import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import logo from './logo.svg';
import './App.css';

import Board from './Board.js';
import Dice from './Dice.js';

import board from './files/board.json';

class App extends Component {

    componentDidMount() {
        this.props.setBoard(board);
    }

    movePosition = (dice) => {
        var pos = (this.props.boardState.position + dice) % 17;
        if(pos === 0) {
            pos++;
        }
        this.timerHandler = setTimeout(()=> this.movePosTimeOut(1, dice, pos), 250);
    }

    movePosTimeOut = (by, to, target) => {
        if(to === 0 && this.timerHandler) {
            clearTimeout(this.timerHandler);
            this.timerHandler = 0;
            this.updateBoardElement();
        } else {
            var pos = (this.props.boardState.position + by) % 17;
            if(pos === 0) {
                pos++;
            }
            this.props.changePosition(pos, target);
            this.timerHandler = setTimeout(()=> this.movePosTimeOut(1, --to, target), 250);
        }
    }

    updateBoardElement = () => {
        var board = this.props.boardState.board;
        board.tiles[this.props.boardState.position - 1].visited++;
        this.props.updateBoard(board);
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
            changePosition: (position, target) => {
                dispatch(Actions.setPosition(position, target));
            },
            setBoard: (board) => {
                dispatch(Actions.setBoard(board));
            },
            updateBoard: (board) => {
                dispatch(Actions.updateBoard(board));
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