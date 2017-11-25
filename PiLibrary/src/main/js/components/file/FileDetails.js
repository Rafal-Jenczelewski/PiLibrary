import React from 'react'

class FileDetails extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.file.name);
    }

    render() {
        return (
            <tr>
                <td>{this.props.file.name}</td>
                <td>{this.props.file.notes}</td>
                <td>{this.props.file.tags}</td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}
