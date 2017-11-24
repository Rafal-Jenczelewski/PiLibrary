import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllFiles} from '../../actions/index'
import FileDetails from './FileDetails'
import FilePage from './FilePage'
import client from '../../client'

class FileList extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(name) {
        fetch("api/uploadedFiles/delete/" + name, {
            method: "delete",
            mode: "cors",
        }).then(() => this.props.getAllFiles())
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

function mapStateToProps(state) {
    return {
        files: state.files,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllFiles: getAllFiles
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
