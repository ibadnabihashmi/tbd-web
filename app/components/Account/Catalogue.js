import React from 'react';
import { connect } from 'react-redux';
import { fetchUserCatalogues } from '../../actions/catalogue';

class Catalogue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: props.user._id,
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
        if(this.state.catalogues.length > 0){
            this.state.catalogues.forEach((catalogue) => {
                const link = `/getCatalogue/${catalogue._id}`;
                cats.push(
                    <a href={link} className="tbd-catalogue-btn">
                        <div className="col-md-4 text-center catalogue-add-btn">
                            {catalogue.name}
                        </div>
                    </a>
                );
            });
            return cats;
        }else{
            return (
                <div>
                    <h1>Ponka!</h1>
                </div>
            );
        }
    }
    render(){
        return(
            <div className="container">
                <div className="panel">
                    <div className="panel-body">
                        {this.renderCatalogues()}
                        <a href="/addCatalogue" className="tbd-catalogue-btn">
                            <div className="col-md-4 text-center catalogue-add-btn">
                                add catalogue +
                            </div>
                        </a>
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