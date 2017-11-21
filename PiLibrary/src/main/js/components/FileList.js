import React from 'react'
import ReactDOM from 'react-dom'
import FileDetails from './FileDetails'
import FilePage from './FilePage'
import client from '../client'

export default class FileList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        client({method: 'GET', path: "/api/comments/search"})
    }

    render() {
        let files = this.props.files.map(file =>
            <FilePage key={file._links.self.href} file={file} onDelete={this.props.onDelete}/>
        );

        return (
            <div>
                {files}
            </div>
        )
    }
}
