'use strict';

import React, { Component } from 'react';
import { 
    View, 
    TouchableHighlight 
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../actions'; 

class Color extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let style = Object.assign({}, this.props.style)
        if (this.props.isSelected){ 
          style.borderWidth = 3;
          style.borderColor = 'black';
        }  
        return (
          <TouchableHighlight style={style} onPress={this.props.onPress}>
            <View></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Color);

