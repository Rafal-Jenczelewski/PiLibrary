import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changePageSize, navigate} from '../actions/index'

export default class PaginationBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        let pageSize = e.target.value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.changePageSize(pageSize);
        }
    }

    handleNavFirst(e) {
        e.preventDefault();
        this.props.navigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.navigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.navigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.navigate(this.props.links.last.href);
    }

    render() {
        let navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (<div>
            <input width={"50px"} ref="pageSize" value={this.props.pageSize}
                   onChange={this.handleInput}/>
            <div>
                {navLinks}
            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        pageSize: state.pageSize,
        links: state.links
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePageSize: changePageSize,
        navigate: navigate
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBar);
