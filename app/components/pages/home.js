'use strict';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../actions'; 
import Menu from './menu';
import Category from './category';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (this.props.page === -1) 
            ? <Menu />
            : <Category page={this.props.categories[this.props.page]} />;
    }
};

function mapStateToProps(state, props) {
    return {
        page: state.dataReducer.page,
        categories: state.dataReducer.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
