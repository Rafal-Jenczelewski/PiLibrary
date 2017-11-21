import React from 'react'
import Comment from './Comment'
import client from '../client'

export default class FilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        client({
            method: "GET",
            path: "/api/comments/search/findByTarget?target=" + this.props.file.name
        }).then(response => {
            this.setState({
                comments: response.entity._embedded.comments
            })
        })
    }

    render() {
        let comments = [];
        for (let comment of this.state.comments)
            comments.push(<Comment margin={15} key={comment.id} comment={comment}/>)

        return (<div>
            <div className="file-page">
                <div className="name-view"><span>{this.props.file.name}</span></div>
                <textarea className="notes-view" value={this.props.file.notes}/>
                <textarea className="tags-view" value={this.props.file.tags}/>
            </div>
            {comments}
        </div>)
    }
}