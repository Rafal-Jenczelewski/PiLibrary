import React from 'react'
import Comment from '../comment/Comment'
import CommentDialog from '../comment/CommentDialog'
import client from '../../client'

export default class FilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };

        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    componentDidMount() {
        this.loadCommentsFromServer();
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
                    <button onClick={() => alert("Nie dziaja ;c")}>Download</button>
                </div>
            </div>
            {comments}
        </div>)
    }
}
