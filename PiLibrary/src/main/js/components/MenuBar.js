import React from 'react'
import CreateDialog from './file/CreateDialog'
import SearchBox from './SearchBox'
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getAllFiles} from '../actions/index'

class MenuBar extends React.Component {
    render() {
        return (<div className={"menu-bar"}>
            <div className="menu-element">
                <button onClick={() => {
                    this.props.history.push("/");
                    this.props.getAllFiles()
                }}>Home
                </button>
            </div>
            <div className="menu-element"><CreateDialog/></div>
            <div className="menu-element"><SearchBox/>
            </div>
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllFiles: getAllFiles,
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(MenuBar));