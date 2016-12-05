import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { fetchFeed } from '../actions/home';
import { browserHistory } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    var from = Date.now();
    var to = Number(from) - 18000000;
    this.state = {
      user: props.user,
      from: from,
      to: to,
      catalogues: []
    };
    this.goToUser = this.goToUser.bind(this);
    this.goToCatalogue= this.goToCatalogue.bind(this);
  }
  goToUser(name){
    browserHistory.push(`/user/${name}`);
  }
  goToCatalogue(id){
    browserHistory.push(`/getCatalogue/${id}`);
  }
  getCatalogues() {
    if(this.state.catalogues.length > 0){
      let cats = [];
      let imageStyle = {
        width:'100%'
      };
      let key = 0;
      this.state.catalogues.forEach((catalogue) => {
        cats.push(
          <div className="feed-element" key={`key1_${key}`}>
            <div>
              <span className="feed-element-name" onClick={this.goToUser.bind(this,catalogue.user.name)}>{catalogue.user.name}</span>
              <span className="feed-element-price">${catalogue.price}</span>
            </div>
            <img src={`http://localhost:3000${catalogue.images[0]}`} style={imageStyle} key={`key2_${key}`}/>
            <div>
              <h4 onClick={this.goToCatalogue.bind(this,catalogue._id)} className="feed-element-cat-name">{catalogue.name}</h4>
              <p>{catalogue.description}</p>
            </div>
            <div></div>
          </div>
        );
        key++;
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
      console.log(json);
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
          <div className="col-sm-6 col-sm-offset-3 panel">
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
