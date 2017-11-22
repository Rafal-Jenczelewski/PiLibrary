import React from 'react'
import client from '../../client'
import CommentDialog from './CommentDialog'

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }

        this.loadCommentFromServer = this.loadCommentFromServer.bind(this);
    }

    componentDidMount() {
        this.loadCommentFromServer();
    }

    loadCommentFromServer() {
        client({
            method: 'GET',
            path: "api/comments/search/findByTarget?target=com" + this.props.comment.id
        }).then(response => {
            this.setState({
                comments: response.entity._embedded.comments
            })
        })
    }

    render() {
        let comments = [];
        for (let comment of this.state.comments)
            comments.push(<Comment margin={this.props.margin + 15} key={comment.id}
                                   comment={comment}/>)

        return (<div>
            <div style={{marginLeft: this.props.margin + "px"}}
                 className="comment-page">
                <div><textarea className="comment-view view" defaultValue={this.props.comment.content}/></div>
                <div className="comment-footer"><CommentDialog
                    onComment={this.loadCommentFromServer}
                    target={"com" + this.props.comment.id}/></div>
            </div>
            <div>{comments}</div>
        </div>)
    }
}
