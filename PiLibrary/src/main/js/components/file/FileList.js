import React from 'react'
import ReactDOM from 'react-dom'
import FileDetails from './FileDetails'
import FilePage from './FilePage'
import client from '../../client'

export default class FileList extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        client({method: 'GET', path: "/api/comments/search"})
    }

    onDelete(name) {
        fetch("api/uploadedFiles/delete/" + name, {
            method: "delete",
            mode: "cors",
        }).then(() => this.props.onDelete())
    }

    render() {
        let files = this.props.files.map(file =>
            <FilePage key={file.name} file={file} onDelete={this.onDelete}/>
        );

        return (
            <div>
                {files}
            </div>
        )
    }
}
