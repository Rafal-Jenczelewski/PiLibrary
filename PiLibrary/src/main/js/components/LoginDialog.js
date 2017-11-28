import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {checkUser, logout} from '../actions/index'
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
        this.handleLogoutClick =this.handleLogoutClick.bind(this);
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
        formData.append("password", this.state.password);

        this.props.login(this.state.user, btoa(this.state.password));

        this.setState({
            user: "",
            password: ""
        });
        window.location = "#";
    }

    handleLogoutClick() {
        this.props.logout();
    }

    render() {
        let button = null;
        if (this.props.authHeader)
            button = <a href="#loginDialog">
                <button className="btn">Log in</button>
            </a>
        else
            button = <button onClick={this.handleLogoutClick}>Log out</button>

        return (
            <div>
                {button}

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
                                onClick={this.handleSubmit}>Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authHeader: state.authHeader
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: checkUser,
        logout: logout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
