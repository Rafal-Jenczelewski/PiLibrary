import React, {Component} from 'react';
import {connect} from 'react-redux';
import Banner from './Banner';
import MenuBar from "./MenuBar";
import Content from './Content'
import {bindActionCreators} from 'redux';
import {getAllFiles, searchByString} from '../actions/index'
import {Route, Switch, withRouter} from "react-router";
import FilePage from './file/FilePage'
import Modal from 'react-modal'
import MessageBox from './MessageBox'

class App extends Component {
    constructor(props) {
        super(props);

        Modal.defaultStyles = {
            content: {
                WebkitOverflowScrolling: "touch",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                outline: "none",
                overflow: "auto",
                padding: "20px",
                width: "300px",
                height: "400px",
                display: "inline-block",
            },
            overlay: {
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                bottom: 0,
                left: 0,
                position: "fixed",
                right: 0,
                top: 0
            }
        };

        this.state = {
            fromSearch: false,
            searchTerm: ""
        };
    }

    render() {
        return (<div className={"App"}>
            <Banner/>
            <MenuBar onUpload={this.props.getAllFiles}/>
            <MessageBox/>
            <Switch>
                <Route path="/file/" render={() => {
                    return <div className="app-content"><FilePage/></div>
                }}/>
                <Route exact path="/" render={() => {
                    return <Content/>
                }}/>
            </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


