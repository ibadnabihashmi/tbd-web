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
      to: new Date(Number(to)).toISOString(),
      catalogues: []
    }
  }
  getCatalogues() {
    if(this.state.catalogues.length > 0){
      let cats = [];
      let imageStyle = {
        width:'100%'
      };
      this.state.catalogues.forEach((catalogue) => {
        cats.push(
          <div>
            <img src={`http://localhost:3000${catalogue.images[0]}`} style={imageStyle}/>
          </div>
        );
      });
      return cats;
    }else{
      return (
        <div></div>
      );
    }
  }
  componentDidMount() {
    let result = this.props.dispatch(fetchFeed(this.state.user._id,this.state.from,this.state.to));
    result.then((json) => {
      this.setState({
        catalogues:json.catalogues
      });
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="col-sm-10 col-sm-offset-1">
              {this.getCatalogues()}
            </div>
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

export default connect(mapStateToProps)(Home);
