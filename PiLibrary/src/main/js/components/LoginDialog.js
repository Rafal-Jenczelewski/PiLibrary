import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../actions/index'

class LoginDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            password: ""
        };

        this.onUserChangeHandler = this.onUserChangeHandler.bind(this);
        this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUserChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            user: value,
        });
    }


    onPasswordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append("username", this.state.user);
        formData.append("password", btoa(this.state.password));

        this.props.login(formData);

        this.setState({
            user: "",
            password: ""
        });
        window.location = "#";
    }

    render() {
        return (
            <div>
                <a href="#loginDialog">
                    <button className="btn">Login</button>
                </a>

                <div id="loginDialog" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Type you username and password</h2>

                        <form>
                            <input type="text" placeholder="Username" className="text-input"
                                   onChange={this.onUserChangeHandler}/>
                            <input type="password" placeholder="Description" className="text-input"
                                      onChange={this.onPasswordChangeHandler}/>
                            <button
                                onClick={this.handleSubmit}>Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginDialog);
