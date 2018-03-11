'use strict';

import React, { Component } from 'react';
import { Text } from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {
    CHECKING_IN,
    CHECKED_IN,
    SKIPPED_CHECKIN,
    COMPLETING_GOAL,
    CREATING_GOAL,
    CANCEL,
    DELETE_GOAL,
    CONFIRM,
    EDIT_CATEGORY_TITLE
} from '../../constants';

import * as Actions from '../../actions'; 

class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let symbol = "%"; 
        let backgroundColor = this.props.color;

        switch (this.props.action) {
          case CHECKING_IN:
          case CHECKED_IN:
          case COMPLETING_GOAL:
          case EDIT_CATEGORY_TITLE:
            symbol = "✓";
            break;
          case CREATING_GOAL: 
          case CONFIRM:
            symbol = "+";
            break;
          case DELETE_GOAL:
            symbol = "★";
            break;
        case SKIPPED_CHECKIN:
        case CANCEL:
            symbol = "×";
            backgroundColor = "#aaaaaa";
            break;
        }
        
        return (
            <Text style={{
                backgroundColor: backgroundColor,
                width: 30,
                height: 30,
                borderRadius: 20,
                marginRight: 5,
                color: 'white',
                fontSize: 20,
                textAlign: 'center'
            }} > {symbol} </Text>
        );
    }
};

function mapStateToProps(state, props) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Icon);

