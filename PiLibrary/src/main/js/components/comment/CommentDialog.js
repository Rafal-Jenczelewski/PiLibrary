import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uploadComment} from '../../actions/index'

class CommentDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            target: this.props.target,
            content: ""
        };

        this.onContentChangeHandler = this.onContentChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onContentChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            content: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();

        formData.append("target", this.state.target);
        formData.append("content", this.state.content);

        this.props.uploadComment(formData);

        this.setState({
            content: ""
        });
        window.location = "#";
    }

    render() {
        return (
            <div>
                <a href={"#createComment" + this.state.target}>
                    <button className="btn">Comment</button>
                </a>

                <div id={"createComment" + this.state.target} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Upload Comment</h2>

                        <form>
                            <textarea placeholder="Description" className="comment-input"
                                      value={this.state.content}
                                      onChange={this.onContentChangeHandler}/>
                            <button disabled={!this.state.content}
                                    onClick={this.handleSubmit}>Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        uploadComment: uploadComment
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(CommentDialog);
