import React from 'react'
import CreateDialog from './Dialogs/CreateDialog'

export default class MenuBar extends React.Component {
    render() {
        return (<div className={"menu-bar"}>
            <CreateDialog attributes={this.props.attributes} onCreate={this.props.onUpload}/>
                <span>User</span>
        </div>)
    }
}