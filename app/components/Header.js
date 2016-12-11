import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';
import { getUnreadNotifications } from '../actions/notifications';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  componentDidMount() {
    if(this.props.token){
      this.props.dispatch(getUnreadNotifications(this.props.user._id));
    }
  }

  render() {
    const active = { borderBottomColor: 'black' };
    const leftNav = this.props.token ? (
        <ul className="nav navbar-nav">
          <li><Link to="/home" activeStyle={active}>Home</Link></li>
          <li><Link to={`/user/${this.props.user.username}`} activeStyle={active}>Profile</Link></li>
          <li><Link to={`/notifications`} activeStyle={active}>Notifications({this.props.notifications})</Link></li>
        </ul>
    ) : null;
    const rightNav = this.props.token ? (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/account" activeStyle={active}>My Account</Link></li>
        <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
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
          <div className="navbar-header">
            <h2 className="navbar-brand header-main-title">{ this.props.token ? this.props.user.name : 'TBD'}</h2>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {leftNav}
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
    user: state.auth.user,
    notifications: state.auth.notifications
  };
};

export default connect(mapStateToProps)(Header);
