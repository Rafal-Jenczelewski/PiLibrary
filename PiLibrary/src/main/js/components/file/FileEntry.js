import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {downloadFile} from '../../actions/index'
import {Link} from "react-router-dom";
import Tag from '../tags/Tag'
import Tags from "../tags/Tags";

class FileEntry extends React.Component {

    constructor(props) {
        super(props);
        this.onDownloadClickHandler = this.onDownloadClickHandler.bind(this);
    }

    onDownloadClickHandler() {
        this.props.downloadFile(this.props.file.name)
    }

    render() {
        let tags = [];
        for (let tag of this.props.file.tags.split(/(?=#)/g)) {
            tags.push(<Tag key={tag} tag={tag}/>)
        }

        return (<div className="file-entry">
            <div style={{display: "inline-block", width: "100%"}}><Link className={"name-link"}
                                                                        to={{pathname: "/file/" + this.props.file.id}}>{this.props.file.name}</Link>
                <button onClick={this.onDownloadClickHandler} style={{float: "right"}}>Download</button>
            </div>
            <Tags tags={this.props.file.tags}/>
        </div>)

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        downloadFile: downloadFile
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(FileEntry);