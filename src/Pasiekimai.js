import React, { Component } from 'react';
import {connect} from "react-redux";

import achievements from './files/achievements.json';

class Pasiekimai extends Component {

    state = {

    }

    createAchievements = () => {

        var rows = [];
        for (var i = 0; i < achievements.achievements.length; i++) {
            var achs = [];
            var ach = achievements.achievements[i];
            for (var a = 0; a < ach.rewards.length; a++) {
                var rew = ach.rewards[a];
                achs.push(
                    <div className="achievement">
                    </div>
                )
            }
            rows.push(
                <div className="ach-row">
                    {achs}
                </div>
            )
        }
        return rows;
    }

    render() {
        return (
            <div>
                <div className="achievements-temp">
                    {this.props.boardState.rolled}
                    {"M: " + this.props.boardState.moves}
                </div>
                <div className="achievements-div">
                    {this.createAchievements()}
                </div>
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