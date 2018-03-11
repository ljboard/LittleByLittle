'use strict';

import React, { Component } from 'react';
import { 
    TouchableHighlight, 
    Text, 
    View 
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    CHECKING_IN,
    COMPLETING_GOAL,
    CREATING_GOAL,
    DELETE_GOAL
} from '../../constants';

import * as Actions from '../../actions'; 
import Icon from './icon';

class Bubble extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let onPress = () => {};
        let onLongPress = () => {};

        switch (this.props.action) {
            case CREATING_GOAL:
                onPress = () => this.props.openGoalPopover();
                break;
            case CHECKING_IN:
                onPress = () => this.props.checkIn(this.props.info);
                break;
            case COMPLETING_GOAL:
                onPress = () => this.props.completeGoal(this.props.info);
                break;
            case DELETE_GOAL: 
                onLongPress = () => this.props.deleteGoal(this.props.info);
                break;
        }

        const backgroundColor = this.props.action === DELETE_GOAL 
            ? this.props.color 
            : "#ffffff70";
        return (
            <TouchableHighlight underlayColor={backgroundColor} style={{
                backgroundColor: backgroundColor,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 5,
                alignSelf: 'center',
                borderRadius: 20,
                }} onPress={onPress} onLongPress={onLongPress}>
                <View style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                }}>
                    <Icon action={this.props.action} />
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                    }}>
                        {this.props.info.title}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
};

function mapStateToProps(state, props) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);

