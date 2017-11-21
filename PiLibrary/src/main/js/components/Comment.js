import React from 'react'
import client from '../client'

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        client({
            method: 'GET',
            path: "api/comments/search/findByTarget?target=com" + this.props.comment.id
        }).then(response => {
            this.setState({
                comments: response.entity._embedded.comments
            })
        })
    }

    render() {
        let comments = [];
        for(let comment of this.state.comments)
            comments.push(<Comment margin={this.props.margin + 15} key={comment.id} comment={comment}/>)

        return (<div className="comment-page">
            <div>{this.props.comment.content}</div>
            <div style={{marginLeft: this.props.margin + ""}}>{comments}</div>
        </div>)
    }
}