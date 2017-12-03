import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal'
import {bindActionCreators} from 'redux';
import {updateFile, uploadFile} from '../../actions/index'
import {withRouter} from "react-router-dom";

class UpdateDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: this.props.file,
            notes: this.props.file.notes,
            tags: this.props.file.tags,
            openModal: false
        };

        this.onNotesChangeHandler = this.onNotesChangeHandler.bind(this);
        this.onTagsChangeHandler = this.onTagsChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            file: nextProps.file,
            notes: nextProps.file.notes,
            tags: nextProps.file.tags
        })
    }

    onNotesChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            notes: value,
        });
    }

    onTagsChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            tags: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let updatedFile = Object.assign({}, this.state.file, {notes: this.state.notes, tags: this.state.tags});
        let p = Promise.resolve(this.props.updateFile(this.state.file._links.self.href, updatedFile, this.props.ETag));
        p.then(this.props.onUpdate);

        this.setState({
            openModal: false
        });
    }

    render() {
        return (
            <div className="modalDialogButton">
                <button onClick={() => this.setState({openModal: true})} className="btn">Update</button>

                <Modal isOpen={this.state.openModal}>
                    <div id={"updateFile"}>
                        <div>

                            <h2>Update file</h2>

                            <form>
                                <textarea placeholder="Description" className="comment-input"
                                          value={this.state.notes}
                                          onChange={this.onNotesChangeHandler}/>
                                <input type={"text"} value={this.state.tags} className={"text-input"}
                                       onChange={this.onTagsChangeHandler}/>
                                <button className={"btn"} onClick={this.handleSubmit}>Update</button>
                                <button className={"btn"} onClick={() => this.setState({openModal: false})}>Cancel
                                </button>
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
        updateFile: updateFile
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(UpdateDialog));
