import React from 'react';
import { connect } from 'react-redux';
import { fetchUserCatalogues } from '../../actions/catalogue';
import { follow, unfollow } from '../../actions/account';
import { getUnreadNotifications } from '../../actions/notifications';
import { Link } from 'react-router';

class Catalogue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:props.params.username,
            isSameUser: false,
            user1:props.user,
            user2:{
                catalogues:[],
                following:[],
                followers:[],
                picture:''
            }
        };
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }
    componentDidMount(){
        let result = this.props.dispatch(fetchUserCatalogues(this.state.username));
        result.then((json) => {
            json.user.catalogues = json.catalogues;
            json.user.picture = json.user.picture?'http://localhost:3000'+json.user.picture:undefined;
            this.setState({
                user2:json.user
            });
            if(json.user._id === this.state.user1._id){
                this.setState({isSameUser: true});
            }
            this.renderCatalogues();
        });
        this.props.dispatch(getUnreadNotifications(this.state.user1._id));
    }
    follow(){
        this.props.dispatch(follow(this.state.user1._id,this.state.user2._id));
        let user1 = this.state.user1;
        let user2 = this.state.user2;
        user2.followers.push(user1._id);
        user1.following.push(user2._id);
        this.setState({
            user1:user1,
            user2:user2
        });
    }
    unfollow(){
        this.props.dispatch(unfollow(this.state.user1._id,this.state.user2._id));
        let user1 = this.state.user1;
        let user2 = this.state.user2;
        let index = user2.followers.indexOf(user1._id);
        user2.followers.splice(index,1);
        index = user1.following.indexOf(user2._id);
        user1.following.splice(index,1);
        this.setState({
            user1:user1,
            user2:user2
        });
    }
    renderCatalogues(){
        let cats = new Array();
        let key = 0;
        if(this.state.user2.catalogues.length > 0){
            this.state.user2.catalogues.forEach((catalogue) => {
                const link = `/getCatalogue/${catalogue._id}`;
                cats.push(
                    <Link to={link} className="tbd-catalogue-btn" key={key}>
                        <div className="col-md-4 text-center catalogue-add-btn" key={key+"_div"}>
                            {catalogue.name}
                        </div>
                    </Link>
                );
                key++;
            });
            if(this.state.isSameUser){
                cats.push(
                    <Link to="/addCatalogue" className="tbd-catalogue-btn" key={key}>
                        <div className="col-md-4 text-center catalogue-add-btn" key={key+"_div"}>
                            add catalogue +
                        </div>
                    </Link>
                );
            }
            return cats;
        }else{
            if(this.state.isSameUser){
                return (
                  <Link href="/addCatalogue" className="tbd-catalogue-btn">
                      <div className="col-md-4 text-center catalogue-add-btn">
                          add catalogue +
                      </div>
                  </Link>
                );
            }else{
                return (
                  <div></div>
                );
            }
        }
    }
    getHeaderName(clazz){
        if(this.state.isSameUser){
            return (
                <div className={`${clazz} header-username-own`}>
                    <h3 className="text-center">{this.state.user2.name}</h3>
                </div>
            );
        }else{
            const headerName = this.state.user2.followers.indexOf(this.state.user1._id) != -1 ? (
              <div className={`${clazz } imfollowing`}>
                  <h3 className="text-center">{this.state.user2.name} <span onClick={this.unfollow}>-</span></h3>
              </div>
            ) : (
              <div className={clazz}>
                  <h3 className="text-center">{this.state.user2.name} <span onClick={this.follow}>+</span></h3>
              </div>
            );
            return headerName;
        }
    }
    // blue #3897f0
    // green  #70c050
    getHeader(){
        const divStyle = {
            backgroundImage:"url('"+this.state.user2.picture+"')"
        };
        if(this.state.user2.picture != undefined){
            return (
                <div className="text-center center-block">
                    <div className="cover" style={divStyle}></div>
                    <div className="col-md-4 text-right right">
                        <span className="following">{this.state.user2.following.length}</span>
                    </div>
                    <div className="col-md-4 text-center">
                        <img
                            className="img-responsive img-circle center-block displayPicture"
                            src={this.state.user2.picture}
                        />
                        {this.getHeaderName("header-username text-center")}
                    </div>
                    <div className="col-md-4 text-left left">
                        <span className="followers">{this.state.user2.followers.length}</span>
                    </div>

                </div>
            );
        }else{
            return (
                <div>
                    <div className="cover"></div>
                    <div className="col-md-4 text-right right">
                        <span className="following">{this.state.user2.following.length}</span>
                    </div>
                    <div className="col-md-4 text-center" style={{height:'0px'}}>
                        <span className="img-responsive img-circle center-block displayPicture no-photo">
                            <h1 className="text-center">
                                {this.state.user2.username[0].toUpperCase()}
                            </h1>
                        </span>
                        {this.getHeaderName("header-username header-username-no-pic text-center")}
                    </div>
                    <div className="col-md-4 text-left left">
                        <span className="followers">{this.state.user2.followers.length}</span>
                    </div>
                </div>
            );
        }
    }
    render(){
        return(
            <div className="container">
                <div className="col-lg-4 col-lg-offset-4">
                    <h2 className="navbar-brand header-main-title profile-page-headername-overlay">{ this.state.user2 ? this.state.user2.name : 'TBD'}</h2>
                </div>
                <div className="panel">
                    {this.getHeader()}
                    <div className="panel-body">
                        {this.renderCatalogues()}
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

export default connect(mapStateToProps)(Catalogue);