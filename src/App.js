import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import logo from './logo.svg';
import './App.css';

import Board from './Board.js';
import Dice from './Dice.js';
import WalletInfo from './WalletInfo.js';
import PiecePurchaseButtons from './PiecePurchaseButtons.js';
import Pasiekimai from './Pasiekimai.js';

import board from './files/board.json';

class App extends Component {

    componentDidMount() {
        this.loadData();

        this.saveTimerHandler = setTimeout(()=> this.saveData(), 10000);
    }

    loadData = () => {
        if(localStorage.board && localStorage.board !== null) {
            this.props.setBoard(JSON.parse(localStorage.board));
            this.props.changePosition(parseInt(localStorage.position), parseInt(localStorage.position));
        }
        else {
            this.props.setBoard(board);
        }
    }

    saveData = () => {
        if(localStorage) {
            localStorage.setItem("board", JSON.stringify(this.props.boardState.board));
            localStorage.setItem("position", this.props.boardState.position);
        }
        this.saveTimerHandler = setTimeout(()=> this.saveData(), 10000);
    }

    movePosition = (dice) => {
        var pos = (this.props.boardState.position + dice) % 17;
        if(pos === 0) {
            pos++;
        }
        this.props.roll(dice);
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

        if (this.saveTimerHandler) {
            clearTimeout(this.saveTimerHandler);
            this.saveTimerHandler = 0;
        }
    }

    render() {
        return (
            <div className="app">
                <div className="board-and-dice">
                    <Board />
                    <div>
                        <WalletInfo />
                        <Dice movePosition = {this.movePosition}/>
                        <Pasiekimai />
                    </div>
                </div>
                <div className="purchases">
                    <PiecePurchaseButtons />
                </div>
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
            },
            roll: (number) => {
                dispatch(Actions.roll(number));
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