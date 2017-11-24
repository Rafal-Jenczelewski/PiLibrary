import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import FileList from './file/FileList'
import PaginationBar from "./PaginationBar";
import Banner from './Banner';
import MenuBar from "./MenuBar";
import {bindActionCreators} from 'redux';
import {getAllFiles, searchByString} from '../actions/index'

const client = require('../client');
const follow = require('../follow');
const root = "/api";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromSearch: false,
            searchTerm: ""
        };

        this.searchByString = this.searchByString.bind(this);
    }

    searchByString(searchString) {
        this.props.searchByString
            .then(() => {
                this.setState({
                    fromSearch: true,
                    searchTerm: searchString
                })
            });
    }

    componentDidMount() {
        this.props.getAllFiles();
    }

    render() {
        const fileList = <FileList/>;

        let content = null;
        if (!this.state.fromSearch)
            content = <div className="app-content">
                {fileList}
                <PaginationBar/>
            </div>;
        else
            content = <div className="app-content">
                <span style={{float: "left"}}>Results for {this.state.searchTerm}:</span>
                {fileList}
            </div>;

        return (<div className={"App"}>
            <Banner/>
            <MenuBar onUpload={this.props.getAllFiles} onEmptySearch={this.props.getAllFiles}
                     search={this.searchByString}/>
            {content}
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        files: state.files,
        links: state.links
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllFiles: getAllFiles,
        searchByString: searchByString
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


