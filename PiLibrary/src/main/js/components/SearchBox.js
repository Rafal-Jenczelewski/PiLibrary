import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllFiles} from '../actions/index'

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            requestTimeout: 0
        };

        this.onChange = this.onChange.bind(this);
        this.dispatchRequest = this.dispatchRequest.bind(this);
    }

    onChange(e) {
        if (this.state.requestTimeout)
            clearTimeout(this.state.requestTimeout);

        this.setState({
            searchString: e.target.value,
            requestTimeout: setTimeout(this.dispatchRequest, 2000)
        })
    }

    dispatchRequest() {
        if (this.state.searchString)
            this.props.search(this.state.searchString);
        else
            this.props.onEmptySearch();
    }

    render() {
        return (<div >
            <input className="search-input" type="text" placeholder="Search..." value={this.state.searchString}
                   onChange={this.onChange}/>
        </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);