import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Messages from '../Messages';
import { getNotifications ,markNotificationRead } from '../../actions/notifications';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:props.user,
      notifications:[]
    };
  }
  markNotificationRead(notificationId,catalogueId) {
    this.props.dispatch(markNotificationRead(notificationId));
    browserHistory.push(`/getCatalogue/${catalogueId}`);
  }
  componentDidMount() {
    let promise = this.props.dispatch(getNotifications(this.state.user._id));
    promise.then((json) => {
      this.setState({
        notifications:json.notifications != null ? json.notifications : []
      });
    })
  }
  renderNotifications(){
    let notifications = [];
    if(this.state.notifications.length > 0){
      let key = 0;
      this.state.notifications.forEach((notification) => {
        let image = `http://localhost:3000${notification.catalogue.images[0]}`;
        const imageStyle = {
          'width': '83px',
          'float': 'right',
          'marginTop': '-61px'
        };
        notifications.push(
          <div className="col-sm-12" key={`pdiv${key}`}>
            <div className="notification-container" onClick={this.markNotificationRead.bind(this,notification._id,notification.catalogue._id)}>
              <p><strong>{notification.message}</strong></p>
              <p className="notification-date">{new Date(notification.createdAt).toDateString()}</p>
              <img src={image} style={imageStyle}/>
            </div>
          </div>
        );
        key++;
      });
      return notifications;
    }else{
      return (
        <div className="col-lg-12 text-center">
          <p>Closed on sunday!!</p>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="container col-lg-6 col-lg-offset-3">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            {this.renderNotifications()}
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