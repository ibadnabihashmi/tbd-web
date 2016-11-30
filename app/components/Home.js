import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { fetchFeed } from '../actions/home'

class Home extends React.Component {
  constructor(props) {
    super(props);
    var from = Date.now();
    var to = Number(from) - 360000000;
    this.state = {
      user: props.user,
      from: new Date(Number(from)).toISOString(),
      to: new Date(Number(to)).toISOString()
    }
  }
  componentDidMount() {
    let result = this.props.dispatch(fetchFeed(this.state.user._id,this.state.from,this.state.to));
    result.then((json) => {
      console.log(json);
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row">

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

export default connect(mapStateToProps)(Home);
