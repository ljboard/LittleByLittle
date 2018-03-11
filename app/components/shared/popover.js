'use strict';

import React, { Component } from 'react';
import { 
    TouchableHighlight, 
    Text, 
    View,
    TextInput
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import { 
  CREATING_GOAL, 
  COMPLETING_GOAL, 
  CANCEL, 
  EDIT_CATEGORY_TITLE 
} from '../../constants';

import * as Actions from '../../actions'; 
import Icon from './icon';
import Color from './color';

class Popover extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputText = "";
        this.inputColor = "";
        this.colors = [
          "#27b29b",
          "#50ed62",
          "#f7dc13",
          "#1ba6f7",
          "#7642e5",
          "#ff9000",
          "#302aaf",
          "#7c20c1",
          "#ad1849",
        ];
        if (props.page) {
          this.colors[0] = props.page.color;
        }
    }

    onClear() {
      this.inputText = "";
      this.props.hideGoalPopover();
      this.props.hideMenuPopover();
      this.props.hideEditCategory();
    }

    onCreate() {
      if (this.inputText !== "") {
        if (this.props.type === "goal") {
          this.props.createGoal({
            action: COMPLETING_GOAL,
            title: this.inputText
          });  
        } else if (this.props.type === "newCategory") {
          this.props.createCategory(this.inputText, this.colors[this.props.selectedMenuColor]);  
        } else if (this.props.type === "editCategory") {
          this.props.editCategoryTitle(this.inputText);  
        }
      }
      this.props.hideGoalPopover();
      this.props.hideMenuPopover();
      this.props.hideEditCategory();
    }
    renderColor(i, type) {
      const getColorStyle = i => {
        return {
          width: 50,
          height: 50,
          backgroundColor: this.colors[i],
          margin: 10,
        }
      }
      if (type === "newCategory") {
        return (
          <Color 
            style={getColorStyle(i)} 
            isSelected={this.props.selectedMenuColor === i} 
            onPress={() => {this.props.updateNewColor(i);}} 
          />);  
      } else if (type === "editCategory") {
        return (
          <Color 
            style={getColorStyle(i)} 
            isSelected={this.props.editPopover.colorIndex === i} 
            onPress={() => {this.props.editCategoryColor(this.colors[i], i);}} 
          />);  
      }
    }
    render() {
        const styles = {
          goalView: {
            position: 'absolute', 
            width: 300,
            height: 200,
            alignSelf: 'center',
            top: 125, 
            margin: 30,
            backgroundColor: 'white',
            borderColor: "black",
            borderWidth: 2,
          }, 
          menuView: {
            position: 'absolute', 
            width: 300,
            alignSelf: 'center',
            top: 50, 
            margin: 30,
            backgroundColor: 'white',
            borderColor: "black",
            borderWidth: 2,
          }, 
          header: {
            fontSize: 30,
            margin: 15,
            textAlign: 'center'
          },
          input: {
            height: 50, 
            width: 260, 
            alignSelf: 'center',
            fontSize: 20,
            textAlign: 'center'
          }
        }
        if (this.props.type === "goal") {
          return (
            <View style={styles.goalView}>
              <Text style={styles.header}>
                CREATE GOAL
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.inputText = text}
              />
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <TouchableHighlight 
                  underlayColor='white'
                  style={{padding: 20}}
                  onPress={() => this.onClear()}>
                    <Icon action={CANCEL} />
                </TouchableHighlight>
                <TouchableHighlight 
                  underlayColor='white'
                  style={{padding: 20}}
                  onPress={() => this.onCreate()}>
                    <Icon action={CREATING_GOAL} color={this.props.color} />
                </TouchableHighlight>
              </View>
            </View>
          );
        } else if (this.props.type === "newCategory") {
          return (
            <View style={styles.menuView}>
              <Text style={styles.header}>
                NEW CATEGORY
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.inputText = text}
              />
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {this.renderColor(0, "newCategory")}
                  {this.renderColor(1, "newCategory")}
                  {this.renderColor(2, "newCategory")}
                </View> 
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {this.renderColor(3, "newCategory")}
                  {this.renderColor(4, "newCategory")}
                  {this.renderColor(5, "newCategory")}
                </View> 
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {this.renderColor(6, "newCategory")}
                  {this.renderColor(7, "newCategory")}
                  {this.renderColor(8, "newCategory")}
                </View> 
              </View>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableHighlight 
                  underlayColor='white'
                  style={{padding: 20}}
                  onPress={() => this.onClear()}>
                    <Icon action={CANCEL} />
                </TouchableHighlight>
                <TouchableHighlight 
                  underlayColor='white'
                  style={{padding: 20}}
                  onPress={() => this.onCreate()}>
                    <Icon action={CREATING_GOAL} color={this.props.color} />
                </TouchableHighlight>
              </View>
            </View>
          )
        } else if (this.props.type === "editCategory") {
          return (
            <View style={styles.menuView}>
              <Text style={styles.header}>
                EDIT CATEGORY
              </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.page.title}
                onChangeText={text => this.inputText = text}
              />
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {this.renderColor(0, "editCategory")}
                  {this.renderColor(1, "editCategory")}
                  {this.renderColor(2, "editCategory")}
                </View> 
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {this.renderColor(3, "editCategory")}
                  {this.renderColor(4, "editCategory")}
                  {this.renderColor(5, "editCategory")}
                </View> 
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {this.renderColor(6, "editCategory")}
                  {this.renderColor(7, "editCategory")}
                  {this.renderColor(8, "editCategory")}
                </View> 
              </View>
              <TextInput
                style={styles.input}
                defaultValue={this.colors[this.props.editPopover.colorIndex]}
                onChangeText={text => {
                  if (text.match(/^#[0-9A-Fa-f]{6}$/)) {
                    this.colors[this.props.editPopover.colorIndex] = text;
                    this.props.editCategoryColor(text, this.props.editPopover.colorIndex);
                  }
                }}
              />
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableHighlight 
                  underlayColor='white'
                  style={{padding: 20}}
                  onPress={() => this.onClear()}>
                    <Icon action={CANCEL} />
                </TouchableHighlight>
                <TouchableHighlight 
                  underlayColor='white'
                  style={{padding: 20}}
                  onPress={() => this.onCreate()}>
                    <Icon action={EDIT_CATEGORY_TITLE} color={this.props.color} />
                </TouchableHighlight>
              </View>
              <TouchableHighlight onPress={this.props.deleteCategory}>
                <Text style={{
                  backgroundColor: '#ba0505',
                  margin: 20,
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 20,
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center'
                }}>DELETE CATEGORY</Text>
              </TouchableHighlight>
            </View>
          )
        }

    }
};

function mapStateToProps(state, props) {
    return {
        selectedMenuColor: state.dataReducer.menuOptions.selectedMenuColor,
        editPopover: state.dataReducer.categoryOptions.editPopover,
        page: state.dataReducer.categories[state.dataReducer.page]
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Popover);
