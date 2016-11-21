import React from 'react';
import { connect } from 'react-redux';
import { fetchCataloguesByTag } from '../../actions/catalogue';

class CataloguesTagged extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: props.user._id,
            tag: props.params.tag,
            catalogues: []
        };
    }
    componentDidMount(){
        const cats = this.props.dispatch(fetchCataloguesByTag(this.state.tag));
        cats.then((json) => {
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
    render(){
        return (
            <div className="container">
                <div className="panel">
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
export default connect(mapStateToProps)(CataloguesTagged);