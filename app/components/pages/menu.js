'use strict';

import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    TouchableHighlight,
    Text,
    Dimensions
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { OPEN_CATEGORY } from '../../constants';

import * as Actions from '../../actions'; 
import Popover from '../shared/popover';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        const popover = this.props.showMenuPopover 
            ? <Popover type='newCategory' color='#53f442' /> 
            : <View></View>;

        return (  
            <View>
                <TouchableHighlight 
                    onPress={this.props.openMenuPopover}
                    underlayColor="white">
                    <Text style={{
                        backgroundColor: "#ffe900", 
                        fontSize: 70,
                        alignSelf: 'center',
                        width: 350,
                        height: 135,
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 20,
                        marginTop: 50,
                        borderRadius: 30, 
                        color: 'white'
                    }}>+</Text>
                </TouchableHighlight>
                <FlatList
                    style={{height: Dimensions.get('window').height - 205}}
                    ref='listRef'
                    data={this.props.categories}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>
                { popover }
            </View>
        );
    }

    renderItem({item, index}) {
        const styles = {
            menuItem: {
                backgroundColor: item.color, 
                fontSize: 50,
                alignSelf: 'center',
                width: 350,
                height: 135,
                textAlignVertical: 'center',
                textAlign: 'center',
                margin: 20,
                borderRadius: 30, 
                color: 'white'
            }
        }
        return (<TouchableHighlight 
            onPress={() => {
                this.props.openCategory(index)}}
            underlayColor="white">
            <Text style={styles.menuItem}>{item.title.toUpperCase()}</Text>
        </TouchableHighlight>);
    }
};

function mapStateToProps(state, props) {
    return {
        categories: state.dataReducer.categories,
        showMenuPopover: state.dataReducer.menuOptions.showMenuPopover
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
