import React, { Component } from 'react';

import BoardPiece from './BoardPiece.js';

class Dice extends Component {

    state = {
        number: 1,
    }

    roll = () => {
        var dice = this.getRandomInt(1, 7);
        this.props.movePosition(dice);
        this.setState({ number: dice});
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    render() {
        return (
            <div className="dice board-piece" onClick={this.roll}>
                {this.state.number}
            </div>
        );
    }
}

export default Dice;
