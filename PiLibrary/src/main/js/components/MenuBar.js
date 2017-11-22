import React from 'react'
import CreateDialog from './file/CreateDialog'
import SearchBox from './SearchBox'

export default class MenuBar extends React.Component {
    render() {
        return (<div className={"menu-bar"}>
            <div className="menu-element"><CreateDialog onCreate={this.props.onUpload}/></div>
            <div className="menu-element"><SearchBox search={this.props.search}
                                                     onEmptySearch={this.props.onEmptySearch}/>
            </div>
        </div>)
    }
}
