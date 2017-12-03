import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {searchByTags} from '../../actions/index'

class Tag extends Component {
    onTagClickHandler() {
       this.props.history.push("/");
       this.props.searchByTags(this.props.tag);
    }

    render() {
        return <span className="tag-view" onClick={this.onTagClickHandler.bind(this)}>{this.props.tag}</span>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchByTags: searchByTags,
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Tag));


