import React from 'react'
import Comment from '../comment/Comment'
import CommentDialog from '../comment/CommentDialog'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteFile, downloadFile, loadComments} from '../../actions/index'

class FilePage extends React.Component {
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
        this.props.downloadFile(this.props.file.name);
    }

    loadCommentsFromServer() {
        let p = Promise.resolve(this.props.loadComments(this.props.file.name));
        p.then((response) => {
            this.setState({
                comments: response
            })
        })
    }

    onDeleteHandler() {
        this.props.deleteFile(this.props.file.name);
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteFile: deleteFile,
        downloadFile: downloadFile,
        loadComments: loadComments
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(FilePage);