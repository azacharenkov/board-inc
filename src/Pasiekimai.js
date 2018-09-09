import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import achievements from './files/achievements.json';
import baseInfo from './files/baseInfo.json';

import quest from './images/question.png';

class Pasiekimai extends Component {

    state = {

    }

    componentDidUpdate() {
        console.log(this.props.boardState);
        if(this.props.boardState.type === "ROLL") {
            var moves = this.props.boardState.moves;
            for (var a = 0; a < achievements.achievements[0].rewards.length; a++) {
                var rew = achievements.achievements[0].rewards[a];
                if(rew.amount <= moves && !this.props.boardState.achieved.includes(rew.id)) {
                    this.props.achieve(rew.id);
                    // Also notify user about it
                }
            }
        }
        if(this.props.boardState.type === "BOARD_UPDATE") {
            if(this.props.boardState.position === this.props.boardState.targetPosition) {
                var info = baseInfo.tiles[this.props.boardState.position - 1];
                if(info.enum === "TAX") {
                   var tile = this.props.boardState.board.tiles[this.props.boardState.position - 1]; 
                    for (var a = 0; a < achievements.achievements[1].rewards.length; a++) {
                        var rew = achievements.achievements[1].rewards[a];
                        if(rew.amount <= tile.visited && !this.props.boardState.achieved.includes(rew.id)) {
                            this.props.achieve(rew.id);
                            // Also notify user about it
                        }
                    }
                }
            }
        }
    }

    createAchievements = () => {

        var rows = [];
        for (var i = 0; i < achievements.achievements.length; i++) {
            var achs = [];
            var ach = achievements.achievements[i];
            for (var a = 0; a < ach.rewards.length; a++) {
                var rew = ach.rewards[a];
                var have = this.props.boardState.achieved.includes(rew.id);
                achs.push(
                    <div className={"achievement " + have}>
                        <img src={this.getAchievementIcon(have, rew)} />
                    </div>
                )

                if(a!==0 && a % 4 === 0) {
                    rows.push(
                        <div className="ach-row">
                            {achs}
                        </div>
                    )
                    achs = [];
                } 
            }
            rows.push(
                <div className="ach-row">
                    {achs}
                </div>
            )
        }
        return rows;
    }

    getAchievementIcon = (have, ach) => {
        if(have) {
            return require('./images/' + ach.imageUrl);
        }
        return quest;
    }

    render() {
        return (
            <div>
                <div className="achievements-div">
                    <div className="achievements-title">
                        Achievements
                    </div>
                    <div className="achievements-list">
                        {this.createAchievements()}
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
            achieve: (ach) => {
                dispatch(Actions.achieve(ach));
            },
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

export default connect(Pasiekimai.mapStateToProps, Pasiekimai.mapDispatchToProps)(Pasiekimai);