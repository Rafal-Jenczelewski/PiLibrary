import React from 'react'

export default class FileDetails extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.file);
    }

    render() {
        return (
            <tr>
                <td>{this.props.file.name}</td>
                <td>{this.props.file.description}</td>
                <td>{this.props.file.tags}</td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}