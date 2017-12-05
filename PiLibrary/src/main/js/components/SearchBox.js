import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllFiles, searchByString} from '../actions/index'
import {withRouter} from "react-router-dom";

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
            requestTimeout: setTimeout(this.dispatchRequest, 500)
        })
    }

    dispatchRequest() {
        if (this.state.searchString) {
            //this.props.history.push("/");
            this.props.search(this.state.searchString);
        }
        else
            this.props.getAllFiles();
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.setState({
            searchString: nextProps.searchTerm
        })
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
        searchTerm: state.search,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllFiles: getAllFiles,
        search: searchByString
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));