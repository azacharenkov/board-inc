import React, { Component } from 'react';
import {connect} from "react-redux";

class WalletInfo extends Component {

    state = {

    }

    render() {
        return (
            <div className = "wallet-state">
                {this.props.walletState.owned}
            </div>
        );
    }

    /*
    * Maps state from the store to properties used by this class
    */
    static mapStateToProps(store) {
        return {
            walletState: store.walletState
        }
    }
}

export default connect(WalletInfo.mapStateToProps, null)(WalletInfo);