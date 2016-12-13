import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { fetchFeed } from '../actions/home';
import { browserHistory } from 'react-router';
var Slider = require('react-slick');

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
  loadMore() {
    this.setState({
      from: this.state.to,
      to: Number(this.state.to) - 18000000
    });
    let result = this.props.dispatch(fetchFeed(this.state.user._id,this.state.from,this.state.to));
    result.then((json) => {
      console.log(json);
      this.setState({
        catalogues:this.state.catalogues.concat(json.catalogues),
        from: Number(json.from),
        to: Number(json.to)
      });
    });
  }
  goToUser(name) {
    browserHistory.push(`/user/${name}`);
  }
  goToCatalogue(id) {
    browserHistory.push(`/getCatalogue/${id}`);
  }
  getCatalogues() {
    if(this.state.catalogues.length > 0){
      let cats = [];
      let imageStyle = {
        width:'100%'
      };
      let key = 0;
      const settings = {
        dots: false,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      };
      this.state.catalogues.forEach((catalogue) => {
        cats.push(
          <div className="feed-element" key={`key1_${key}`}>
            <div>
              <span className="feed-element-name" onClick={this.goToUser.bind(this,catalogue.user.name)}>{catalogue.user.name}</span>
              <span className="feed-element-price">${catalogue.price}</span>
            </div>
            <div>
              <Slider {...settings}>
                <img src={`http://localhost:3000${catalogue.images[0]}`} style={imageStyle} key={`key_image1_${key}`}/>
                <img src={`http://localhost:3000${catalogue.images[1]}`} style={imageStyle} key={`key_image2_${key}`}/>
                <img src={`http://localhost:3000${catalogue.images[2]}`} style={imageStyle} key={`key_image3_${key}`}/>
                <img src={`http://localhost:3000${catalogue.images[3]}`} style={imageStyle} key={`key_image4_${key}`}/>
              </Slider>
            </div>
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
        catalogues:json.catalogues,
        from: Number(json.from),
        to: Number(json.to)
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
            <button className="btn tbd-btn width-100" onClick={this.loadMore.bind(this)}>Load more</button>
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
