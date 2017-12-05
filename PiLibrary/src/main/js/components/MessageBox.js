import React, {Component} from 'react';
import {connect} from 'react-redux';
import Popup from 'react-popup'

class MessageBox extends Component {
  componentWillReceiveProps(nextProps) {
        if (!nextProps.message.msg)
            return;

        Popup.create({
            title: nextProps.message.error ? "Error" : "Success",
            content: nextProps.message.msg,
            className: nextProps.message.error ? "error-alert" : "success-alert",
            buttons: {},
            closeOnOutsideClick: true
        })
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        message: state.message
    }
}

export default connect(mapStateToProps, null)(MessageBox);


