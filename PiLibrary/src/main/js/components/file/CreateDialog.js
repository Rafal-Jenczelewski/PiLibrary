import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {uploadFile} from '../../actions/index'
import Modal from 'react-modal'

class CreateDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            notes: "",
            tags: "",
            file: undefined,
            isNameValid: false,
            openModal: false
        };

        this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
        this.onNotesChangeHandler = this.onNotesChangeHandler.bind(this);
        this.onTagsChangeHandler = this.onTagsChangeHandler.bind(this);
        this.onFileClickHandler = this.onFileClickHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearStateAndClose = this.clearStateAndClose.bind(this);
    }

    onNameChangeHandler(e) {
        let value = e.target.value;
        let nameValidity = this.validateName(value);
        this.setState({
            name: e.target.value,
            isNameValid: nameValidity
        });
    }

    validateName(value) {
        return value.lastIndexOf(".") < value.length - 1 && value.lastIndexOf(".") > -1;
    }

    onNotesChangeHandler(e) {
        this.setState({
            notes: e.target.value
        });
    }

    onTagsChangeHandler(e) {
        this.setState({
            tags: e.target.value
        });
    }

    onFileClickHandler(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append("file", this.state.file);
        formData.append("name", this.state.name);
        formData.append("notes", this.state.notes);
        formData.append("tags", this.state.tags);

        this.props.uploadFile(formData);

        this.clearStateAndClose();
    }

    clearStateAndClose() {
        this.setState({
            name: "",
            notes: "",
            tags: "",
            files: undefined,
            isNameValid: false,
            openModal: false
        });

    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({openModal: true})} className="btn">Create</button>

                <Modal isOpen={this.state.openModal}>
                    <div id="createFile">
                        <div>

                            <h2>Upload new file</h2>

                            <form>
                                <input type="text" placeholder="Name" className="text-input" value={this.state.name}
                                       onChange={this.onNameChangeHandler}/>
                                <textarea placeholder="Description" className="notes-input" value={this.state.notes}
                                          onChange={this.onNotesChangeHandler}/>
                                <input type="text" placeholder="Tags" className="text-input" value={this.state.tags}
                                       onChange={this.onTagsChangeHandler}/>
                                <input className="text-input" type="file"
                                       onChange={this.onFileClickHandler}
                                       onClick={(event) => event.target.value = null}/>
                                <button className="btn"
                                    disabled={this.state.file === undefined || !this.state.isNameValid}
                                    onClick={this.handleSubmit}>Create
                                </button>
                                <button onClick={this.clearStateAndClose}>Cancel</button>
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
        uploadFile: uploadFile
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(CreateDialog);
