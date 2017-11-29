import React, {Component} from 'react';
import {connect, Provider} from 'react-redux';
import FileList from './file/FileList'
import PaginationBar from "./PaginationBar";
import Banner from './Banner';
import MenuBar from "./MenuBar";
import {bindActionCreators} from 'redux';
import {getAllFiles, searchByString} from '../actions/index'

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
        let p = Promise.resolve(this.props.searchByString(searchString));
        p.then(() => {
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
        let msgBox = null;
        if (this.props.message.msg)
            msgBox = <span className={this.props.message.error ? "error-box box" : "msg-box box"}>{this.props.message.msg}</span>;

        const fileList = <FileList/>;

        let content = null;
        if (!this.state.fromSearch)
            content = <div className="app-content">
                {msgBox}
                {fileList}
                <PaginationBar/>
            </div>;
        else
            content = <div className="app-content">
                {msgBox}
                <span style={{float: "left"}}>Results for {this.state.searchTerm}:</span>
                {fileList}
            </div>;


        return (<div className={"App"}>
            <Banner/>
            <MenuBar onUpload={this.props.getAllFiles} search={this.searchByString}/>
            {content}
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        files: state.files,
        links: state.links,
        message: state.message
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllFiles: getAllFiles,
        searchByString: searchByString
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


