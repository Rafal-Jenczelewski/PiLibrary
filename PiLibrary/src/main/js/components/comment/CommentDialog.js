import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uploadComment} from '../../actions/index'
import Modal from 'react-modal'

class CommentDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            openModal: false
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

        formData.append("target", this.props.target);
        formData.append("content", this.state.content);

        let p = Promise.resolve(this.props.uploadComment(formData));
        p.then(this.props.onComment);

        this.setState({
            content: "",
            openModal: false
        });
    }

    render() {
        return (
            <div className="modalDialogButton">
                <button onClick={() => this.setState({openModal: true})} className="btn">Comment</button>

                <Modal isOpen={this.state.openModal}>
                    <div id={"createComment" + this.state.target}>
                        <div>
                            <h2>Upload Comment</h2>

                            <form>
                            <textarea placeholder="Description" className="comment-input"
                                      value={this.state.content}
                                      onChange={this.onContentChangeHandler}/>
                                <button className={"btn"} disabled={!this.state.content}
                                        onClick={this.handleSubmit}>Comment
                                </button>
                                <button className={"btn"} onClick={() => this.setState({content: "", openModal: false})}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </Modal>
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
