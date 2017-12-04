import React from 'react'
import Comment from '../comment/Comment'
import CommentDialog from '../comment/CommentDialog'
import UpdateDialog from './UpdateDialog'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteFile, downloadFile, loadComments, getFile} from '../../actions/index'
import {withRouter} from "react-router";
import Tags from "../tags/Tags";

class FilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            file: {},
            ETag: ""
        };

        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.fetchFile = this.fetchFile.bind(this);
        this.fetchFileDetails = this.fetchFileDetails.bind(this);
    }

    componentDidMount() {
        this.fetchFileDetails();
    }

    fetchFileDetails() {
        let id = this.props.location.pathname.split("/").slice(-1)[0];
        console.log("will ask for file " + id);
        let p = Promise.resolve(this.props.getFile(id));
        p.then(response => {
            this.setState({
                ETag: response.headers.get("ETag")
            });
            return response.json();
        }).then((file) => {
            console.log("got response with file: ");
            console.log(file);
            this.setState({
                file: file
            }, this.loadCommentsFromServer)
        })
    }

    fetchFile() {
        this.props.downloadFile(this.state.file.name);
    }

    loadCommentsFromServer() {
        let p = Promise.resolve(this.props.loadComments(this.state.file.name));
        p.then((response) => {
            this.setState({
                comments: response
            })
        })
    }

    onDeleteHandler() {
        let p = Promise.resolve(this.props.deleteFile(this.state.file.name));
        p.then(() => {
            console.log("props?");
            console.log(this.props)
            this.props.history.push("/");
        })
    }

    render() {
        let comments = [];
        for (let comment of this.state.comments)
            comments.push(<Comment margin={0} key={comment.id} comment={comment}
            />)

        return (<div>
            <div className="file-page page">
                <div className="name-view"><span>{this.state.file.name}</span></div>
                <textarea className="notes-view view" readOnly={true} value={this.state.file.notes}/>
                <Tags tags={this.state.file.tags}/>
                <div className="comment-footer">
                    <CommentDialog onComment={this.loadCommentsFromServer} target={this.state.file.name}/>
                    <UpdateDialog file={this.state.file} ETag={this.state.ETag} onUpdate={this.fetchFileDetails}/>
                    <button className={"btn"} onClick={this.onDeleteHandler}>Delete</button>
                    <button className={"btn"} onClick={this.fetchFile}>Download</button>
                </div>
            </div>
            {comments}
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteFile: deleteFile,
        downloadFile: downloadFile,
        loadComments: loadComments,
        getFile: getFile
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(FilePage));