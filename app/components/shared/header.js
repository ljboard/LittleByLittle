'use strict';

import React, { Component } from 'react';
import { 
    Text, 
    TouchableHighlight,
    View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../actions'; 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View 
                style={{
                    backgroundColor: this.props.color,
                    marginTop: 40,
                    marginBottom: 20,
                    padding: 5,
                    width: 350,
                    alignSelf: 'center',
                    borderRadius: 20,
                    height: 70,
                    }}>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <TouchableHighlight 
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'                        
                        }}
                        onPress={() => this.props.openCategory(-1)}>
                        <Text style={{
                            backgroundColor: 'white',
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                            color: this.props.color,
                            fontSize: 20,
                            textAlign: 'center'
                        }}>{"«"}</Text>
                    </TouchableHighlight>
                    <Text style={{
                        flex: 5,
                        fontSize: 45,
                        textAlign: 'center',
                        color: 'white',
                    }}>
                        {this.props.title.toUpperCase()}
                    </Text>
                    <TouchableHighlight 
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'                        
                        }}
                        onPress={() => this.props.openEditCategory()}>
                        <Text style={{
                            backgroundColor: 'white',
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                            color: this.props.color,
                            fontSize: 20,
                            textAlign: 'center'
                        }}>{"ℹ"}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
};

function mapStateToProps(state, props) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

