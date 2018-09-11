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
import Upgrades from './Upgrades.js';

import board from './files/board.json';

class App extends Component {

    componentDidMount() {
        this.saveTimerHandler = setTimeout(()=> this.saveData(), 10000);
    }

    saveData = () => {
        if(localStorage) {
            localStorage.setItem("board", JSON.stringify(this.props.boardState.board));
            localStorage.setItem("position", this.props.boardState.position);
            localStorage.setItem("moves", this.props.boardState.moves);
            localStorage.setItem("baseIncome", this.props.boardState.baseIncome);
            localStorage.setItem("wallet", this.props.walletState.owned);
            localStorage.setItem("achieved", this.props.boardState.achieved.join());
            localStorage.setItem("rolled", this.props.boardState.rolled.join());
            localStorage.setItem("upgrades", this.props.boardState.upgrades.join());
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
                    <PiecePurchaseButtons />
                </div>
                <div>
                        <div className="wallet-and-dice-div">
                            <WalletInfo />
                            <Dice movePosition = {this.movePosition}/>
                        </div>
                        <div>
                            <Pasiekimai />
                            <Upgrades />
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
            boardState: store.boardState,
            walletState: store.walletState
        }
    }
}

export default connect(App.mapStateToProps, App.mapDispatchToProps)(App);