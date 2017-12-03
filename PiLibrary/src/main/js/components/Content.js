import React, {Component} from 'react';
import {connect} from 'react-redux';
import FileList from './file/FileList'
import {bindActionCreators} from 'redux';
import {getAllFiles} from '../actions/index'
import {withRouter} from "react-router-dom";

class Content extends Component {

    componentDidMount() {
        this.props.getAllFiles();
    }

    render() {
        let searchResult = null;
        if (this.props.search)
            searchResult = <span>Results for {this.props.search}:</span>;

        return (<div>
            <div className="app-content">
                {searchResult}
                <FileList/>
            </div>;
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        files: state.files,
        links: state.links,
        search: state.search
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllFiles: getAllFiles,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));


