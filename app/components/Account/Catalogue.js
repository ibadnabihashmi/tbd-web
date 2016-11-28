import React from 'react';
import { connect } from 'react-redux';
import { fetchUserCatalogues } from '../../actions/catalogue';

class Catalogue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: props.user._id,
            name: props.user.name,
            username: props.user.username,
            dp:props.user.picture?'http://localhost:3000'+props.user.picture:undefined,
            isSameUser: false,
            catalogues:[]
        }
    }
    componentDidMount(){
        let result = this.props.dispatch(fetchUserCatalogues(this.state.username));
        result.then((json) => {
            this.setState({catalogues:json.catalogues});
            if(json.userId === this.state.userId){
                this.setState({isSameUser: true});
            }
            this.renderCatalogues();
        });
    }
    renderCatalogues(){
        let cats = new Array();
        let key = 0;
        if(this.state.catalogues.length > 0){
            this.state.catalogues.forEach((catalogue) => {
                const link = `/getCatalogue/${catalogue._id}`;
                cats.push(
                    <a href={link} className="tbd-catalogue-btn" key={key}>
                        <div className="col-md-4 text-center catalogue-add-btn" key={key+"_div"}>
                            {catalogue.name}
                        </div>
                    </a>
                );
            });
            if(this.state.isSameUser){
                cats.push(
                    <a href="/addCatalogue" className="tbd-catalogue-btn">
                        <div className="col-md-4 text-center catalogue-add-btn">
                            add catalogue +
                        </div>
                    </a>
                );
            }
            return cats;
        }else{
            return (
                <div></div>
            );
        }
    }
    getHeaderName(clazz){
        if(this.state.isSameUser){
            return (
                <div className={clazz}>
                    <h3 className="text-center">{this.state.name}</h3>
                </div>
            );
        }else{
            return (
                <div className={clazz}>
                    <h3 className="text-center">{this.state.name} <span>+</span></h3>
                </div>
            );
        }
    }
    // green #3897f0
    // blue  #70c050
    getHeader(){
        const divStyle = {
            backgroundImage:"url('"+this.state.dp+"')"
        };
        if(this.state.dp != undefined){
            return (
                <div className="text-center center-block">
                    <div className="cover" style={divStyle}></div>
                    <div className="col-md-4 text-right right">
                        <span className="following">400</span>
                    </div>
                    <div className="col-md-4 text-center">
                        <img
                            className="img-responsive img-circle center-block displayPicture"
                            src={this.state.dp}
                        />
                        {this.getHeaderName("header-username text-center")}
                    </div>
                    <div className="col-md-4 text-left left">
                        <span className="followers">400</span>
                    </div>

                </div>
            );
        }else{
            return (
                <div>
                    <div className="cover"></div>
                    <div className="col-md-4 text-right right">
                        <span className="following">400</span>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="displayPicture no-photo">
                            <h1 className="text-center">
                                {this.state.username[0].toUpperCase()}{this.state.username[1].toUpperCase()}
                            </h1>
                        </div>
                        {this.getHeaderName("header-username header-username-no-pic text-center")}
                    </div>
                    <div className="col-md-4 text-left left">
                        <span className="followers">400</span>
                    </div>
                </div>
            );
        }
    }
    render(){
        return(
            <div className="container">
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