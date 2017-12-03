import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllFiles} from '../../actions/index'
import FilePage from './FilePage'
import FileEntry from './FileEntry'

class FileList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        let files = "Looks like results are empty";

        if (this.props.files.length !== 0) {
            files = this.props.files.map(file =>
                <FileEntry key={file.name} file={file}/>
            );
        }

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
