import React from 'react'
import Comment from '../comment/Comment'
import CommentDialog from '../comment/CommentDialog'
import fileDownload from 'js-file-download'
import client from '../../client'

export default class FilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };

        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.fetchFile = this.fetchFile.bind(this);
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    fetchFile() {
        fetch("api/uploadedFiles/download/" + this.props.file.name, {
            method: "get",
            mode: "cors"
        }).then(response => {
            return response.text();
        }).then(data => {
            fileDownload(data, this.props.file.name)
        })
    }

    loadCommentsFromServer() {
        client({
            method: "GET",
            path: "/api/comments/search/findByTarget?target=" + this.props.file.name
        }).then(response => {
            this.setState({
                comments: response.entity._embedded.comments
            })
        })
    }

    onDeleteHandler() {
        this.props.onDelete(this.props.file.name);
    }

    render() {
        let comments = [];
        for (let comment of this.state.comments)
            comments.push(<Comment margin={5} key={comment.id} comment={comment}
            />)

        return (<div>
            <div className="file-page">
                <div className="name-view"><span>{this.props.file.name}</span></div>
                <textarea className="notes-view view" defaultValue={this.props.file.notes}/>
                <textarea className="tags-view view" defaultValue={this.props.file.tags}/>
                <div className="comment-footer"><CommentDialog
                    onComment={this.loadCommentsFromServer} target={this.props.file.name}/>
                    <button onClick={this.onDeleteHandler}>Delete</button>
                    <button onClick={this.fetchFile}>Download</button>
                </div>
            </div>
            {comments}
        </div>)
    }
}
