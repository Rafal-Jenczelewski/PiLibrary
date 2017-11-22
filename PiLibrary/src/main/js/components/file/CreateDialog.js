import React from 'react';
import ReactDOM from 'react-dom';

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            notes: "",
            tags: "",
            file: undefined,
            isNameValid: false
        };

        this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
        this.onNotesChangeHandler = this.onNotesChangeHandler.bind(this);
        this.onTagsChangeHandler = this.onTagsChangeHandler.bind(this);
        this.onFileClickHandler = this.onFileClickHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        fetch("api/uploadedFiles/upload", {
            mode: "cors",
            body: formData,
            method: "post",
        }).then(() => this.props.onCreate()
        ).catch((error) => {
            console.log(error);
        });

        this.setState({
            name: "",
            notes: "",
            tags: "",
            files: undefined,
            isNameValid: false
        });
        window.location = "#";
    }

    render() {
        return (
            <div>
                <a href="#createFile">
                    <button className="btn">Create</button>
                </a>

                <div id="createFile" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Upload new file</h2>

                        <form>
                            <input type="text" placeholder="Name" className="text-input"
                                   onChange={this.onNameChangeHandler}/>
                            <textarea placeholder="Description" className="notes-input"
                                      onChange={this.onNotesChangeHandler}/>
                            <input type="text" placeholder="Tags" className="text-input"
                                   onChange={this.onTagsChangeHandler}/>
                            <input className="text-input" type="file"
                                   onChange={this.onFileClickHandler}
                                   onClick={(event) => event.target.value = null}/>
                            <button
                                disabled={this.state.file === undefined || !this.state.isNameValid}
                                onClick={this.handleSubmit}>Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
