import React, { Component } from 'react';
import {connect} from "react-redux";
import {Actions} from './Actions.jsx';

import upgrades from './files/upgrades.json';

import quest from './images/question.png';

class Upgrades extends Component {

    state = {

    }

    createAchievements = () => {

        var rows = [];
        var achs = [];
        var a = 0;
        var owned = this.props.walletState.owned;
        for (var key in upgrades) {
            var upgrade = upgrades[key];

            if(upgrade.requirementType === "MONEY" && owned < upgrade.requirement) {
                continue;
            }
            
            achs.push(
                <div className={"achievement " + (owned >= upgrade.cost)}>
                    <img src={quest} />
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
            a++;
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
                        Upgrades
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
            boardState: store.boardState,
            walletState: store.walletState
        }
    }
}

export default connect(Upgrades.mapStateToProps, Upgrades.mapDispatchToProps)(Upgrades);