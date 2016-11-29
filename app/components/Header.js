import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const active = { borderBottomColor: '#3f51b5' };
    const rightNav = this.props.token ? (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" data-toggle="dropdown" className="navbar-avatar dropdown-toggle">
            {this.props.user.name || this.props.user.email || this.props.user.id}{' '}
            <i className="caret"></i>
          </a>
          <ul className="dropdown-menu">
            <li><a href="/account">My Account</a></li>
            <li className="divider"></li>
            <li><a href={`/user/${this.props.user.username}`}>Profile</a></li>
            <li className="divider"></li>
            <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login" activeStyle={active}>Log in</Link></li>
        <li><Link to="/signup" activeStyle={active}>Sign up</Link></li>
      </ul>
    );
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={active}>Home</IndexLink></li>
            </ul>
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Header);
