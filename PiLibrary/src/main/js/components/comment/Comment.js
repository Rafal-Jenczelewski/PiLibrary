import React from 'react'
import CommentDialog from './CommentDialog'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadComments} from '../../actions/index'

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };

        this.loadCommentFromServer = this.loadCommentFromServer.bind(this);
    }

    componentDidMount() {
        this.loadCommentFromServer();
    }

    loadCommentFromServer() {
        let p = Promise.resolve(this.props.loadComments("com" + this.props.comment.id));
        p.then(response => {
            this.setState({
                comments: response
            })
        })
    }

    render() {
        let comments = [];

        for (let comment of this.state.comments)
            comments.push(<ConnectedComment margin={this.props.margin + 15} key={comment.id}
                                            comment={comment}/>)

        return (<div>
            <div style={{marginLeft: this.props.margin + "px"}}
                 className="comment-page page">
                <textarea className="comment-view view" defaultValue={this.props.comment.content}/>
                <div className="comment-footer"><CommentDialog
                    onComment={this.loadCommentFromServer}
                    target={"com" + this.props.comment.id}
                    onClose={this.loadCommentFromServer}
                />
                </div>
            </div>
            <div>{comments}</div>
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadComments: loadComments
    }, dispatch);
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment);

export default ConnectedComment