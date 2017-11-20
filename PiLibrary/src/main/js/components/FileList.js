import React from 'react'
import ReactDOM from 'react-dom'
import FileDetails from './FileDetails'

export default class FileList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let files = this.props.files.map(file =>
            <FileDetails key={file._links.self.href} file={file} onDelete={this.props.onDelete}/>
        );

        return (
            <div>

                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th/>
                    </tr>
                    {files}
                    </tbody>
                </table>
            </div>
        )
    }
}
