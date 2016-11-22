import React from 'react';
import { connect } from 'react-redux';
import { fetchUserCatalogues } from '../../actions/catalogue';

class Catalogue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: props.user._id,
            username: props.user.name,
            dp:props.user.picture?'http://localhost:3000'+props.user.picture:undefined,
            catalogues:[]
        }
    }
    componentDidMount(){
        let result = this.props.dispatch(fetchUserCatalogues(this.state.userId));
        result.then((json) => {
            this.setState({catalogues:json.catalogues});
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
            return cats;
        }else{
            return (
                <div></div>
            );
        }
    }
    getHeader(){
        const divStyle = {
            backgroundImage:"url('"+this.state.dp+"')"
        };
        if(this.state.dp != undefined){
            return (
                <div className="text-center center-block">
                    <div className="cover" style={divStyle}></div>
                    <div className="displayPicture">
                        <img
                            className="img-responsive img-circle center-block"
                            src={this.state.dp}
                        />
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="cover"></div>
                    <div className="displayPicture">
                        <h1 className="text-center">
                            {this.state.username[0].toUpperCase()}{this.state.username[1].toUpperCase()}
                        </h1>
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
                        <a href="/addCatalogue" className="tbd-catalogue-btn">
                            <div className="col-md-4 text-center catalogue-add-btn">
                                add catalogue +
                            </div>
                        </a>
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