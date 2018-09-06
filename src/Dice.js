import React, { Component } from 'react';

import BoardPiece from './BoardPiece.js';

import one from './images/1.png';
import two from './images/2.png';
import three from './images/3.png';
import four from './images/4.png';
import five from './images/5.png';
import six from './images/6.png';

class Dice extends Component {

    state = {
        number: 1,
    }

    rollWithoutCallBack = () => {
        this.timerHandler = setTimeout(()=> this.rollWithTimeOut(8), 0);
    }

    rollWithTimeOut = (to) => {

        var dice = this.getRandomInt(1, 7);
        this.setState({ number: dice});

        if(to === 0) {
            clearTimeout(this.timerHandler);
            this.timerHandler = 0;
            this.props.movePosition(dice);
        } else {
            this.timerHandler = setTimeout(()=> this.rollWithTimeOut(--to), 125);
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

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getDice = () => {
        var diceImg = one;
        if(this.state.number === 2) {
            diceImg = two;
        } else if(this.state.number === 3) {
            diceImg = three;
        } else if(this.state.number === 4) {
            diceImg = four;
        } else if(this.state.number === 5) {
            diceImg = five;
        } else if(this.state.number === 6) {
            diceImg = six;
        }

        return (
            <img src = {diceImg} alt = {this.state.number}/>
        )
    }

    render() {
        return (
            <div className="dice board-piece" onClick={this.rollWithoutCallBack}>
                {this.getDice()}
            </div>
        );
    }
}

export default Dice;
