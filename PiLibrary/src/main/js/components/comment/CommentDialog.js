import React from 'react';
import ReactDOM from 'react-dom';

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            target: this.props.target,
            content: ""
        };

        this.onContentChangeHandler = this.onContentChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onContentChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            content: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();

        formData.append("target", this.state.target);
        formData.append("content", this.state.content);

        fetch("api/comments/comment", {
            mode: 'cors',
            body: formData,
            method: 'post'
        }).then(() => this.props.onComment())
            .catch((error) =>
                console.log(error));

        this.setState({
            content: ""
        });
        window.location = "#";
    }

    render() {
        return (
            <div>
                <a href={"#createComment" + this.state.target}>
                    <button className="btn">Comment</button>
                </a>

                <div id={"createComment" + this.state.target} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Upload Comment</h2>

                        <form>
                            <textarea placeholder="Description" className="comment-input"
                                      value={this.state.content}
                                      onChange={this.onContentChangeHandler}/>
                            <button disabled={!this.state.content}
                                    onClick={this.handleSubmit}>Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
