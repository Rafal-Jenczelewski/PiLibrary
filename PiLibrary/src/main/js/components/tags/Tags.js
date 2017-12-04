import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {searchByTags} from '../../actions/index'
import Tag from "./Tag";

class Tags extends Component {

    render() {
        let tags = [];
        if (this.props.tags) {
            for (let tag of this.props.tags.split(/(?=#)/g)) {
                console.log(tag);
                tags.push(<Tag key={tag} tag={tag}/>)
            }
        }

        return <div className="tags-view">{tags}</div>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchByTags: searchByTags,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Tags);


