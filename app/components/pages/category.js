'use strict';

import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    Dimensions,
    Button
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    CHECKING_IN,
    COMPLETED_GOAL,
    CREATING_GOAL,
    DELETE_GOAL
} from '../../constants';

import Header from '../shared/header';
import Popover from '../shared/popover';
import Bubble from '../shared/bubble';
import Icon from '../shared/icon';
import * as Actions from '../../actions'; 

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.height = Dimensions.get('window').height;
        this.renderBubble = this.renderBubble.bind(this);
        this.renderHistoryItem = this.renderHistoryItem.bind(this);
    }

    componentWillMount() {
        if (this.props.history.length !== 0) {
            this.props.updateCheckins();
        }
    }

    render() {
        let bubbleOptions = [
            { action: CHECKING_IN,   title: "CHECK IN"},
            { action: CREATING_GOAL, title: "NEW GOAL"},
        ];

        const goalPopover = this.props.showGoalPopover ? 
            <Popover type='goal' color={this.props.page.color} /> : 
            <View></View>;

        const editPopover = this.props.editPopover.show ? 
            <Popover type='editCategory' color={this.props.page.color} /> : 
            <View></View>;

        bubbleOptions = bubbleOptions.concat(this.props.goals);

        let history = 
            <View style={{height: this.height, backgroundColor: 'white'}}>
                <Text style={{margin: 20, fontSize: 20, textAlign: 'center'}}>
                    Check in or start creating goals!
                </Text>
            </View>
        if (this.props.history.length !== 0) {
            history = (
                <View style={{margin: 10}}>
                    <FlatList
                        style={{height: this.height - 205}}
                        ref='listRef'
                        data={this.props.history}
                        renderItem={this.renderHistoryItem}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}/>
                </View>
            );
        }
        return (  
            <View>
                <Header title={this.props.page.title} color={this.props.page.color} />
                <View style={{backgroundColor: this.props.page.color + 'dd'}}>
                    <FlatList
                        ref='listRef'
                        data={bubbleOptions}
                        renderItem={this.renderBubble}
                        horizontal={true}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}/>
                </View>
                { history }
                { goalPopover }
                { editPopover }
            </View>
        );
    }

    renderBubble({item, index}) {
        return <Bubble action={item.action} info={item} />;
    }

    renderHistoryItem({item, index}) {
        if (item.action === DELETE_GOAL) {
            return <Bubble 
                action={DELETE_GOAL} 
                color={this.props.page.color + '50'} 
                info={item} 
            />;
        } else {
            return (
                <View style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                    marginLeft: 15,
                    marginTop: 10,
                    marginBottom: 10}}>
                    <Icon action={item.action} color={this.props.page.color} />
                    <Text style={{fontSize: 20}}>{item.date}</Text>
                </View>
            );
        }
    }

};

function mapStateToProps(state, props) {
    return {
        goals: state.dataReducer.categories[state.dataReducer.page].goals,
        history: state.dataReducer.categories[state.dataReducer.page].history,
        showGoalPopover: state.dataReducer.categoryOptions.showGoalPopover,
        editPopover: state.dataReducer.categoryOptions.editPopover,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
