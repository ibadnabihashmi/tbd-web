import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Messages from '../Messages';
import { getNotifications } from '../../actions/notifications'; 

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:props.user
    };
  }
  componentDidMount() {
    let promise = this.props.dispatch(getNotifications(this.state.user._id));
    promise.then((json) => {
      console.log(json);
    })
  }
  render() {
    return (
      <div className="container col-lg-6 col-lg-offset-3">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <h1>Notifications</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Notifications);