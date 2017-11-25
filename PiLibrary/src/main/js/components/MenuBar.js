import React from 'react'
import CreateDialog from './file/CreateDialog'
import SearchBox from './SearchBox'
import {connect} from 'react-redux';

export default class MenuBar extends React.Component {
    render() {
        return (<div className={"menu-bar"}>
            <div className="menu-element"><CreateDialog/></div>
            <div className="menu-element"><SearchBox search={this.props.search}/>
            </div>
        </div>)
    }
}
