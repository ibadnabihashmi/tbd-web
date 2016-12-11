import React from 'react';
import { connect } from 'react-redux';
import { fetchCataloguesByTag } from '../../actions/catalogue';
import { Link } from 'react-router';

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
                let catBackground = {
                    backgroundSize: 'cover',
                    backgroundImage:"url('http://localhost:3000"+catalogue.images[0]+"')",
                };
                const link = `/getCatalogue/${catalogue._id}`;
                cats.push(
                    <Link href={link} className="tbd-catalogue-btn" key={key}>
                        <div className="col-md-4 text-center catalogue-add-btn" key={key+"_div"} style={catBackground}>
                            <div className="caption">
                                <h3>{catalogue.name}</h3>
                            </div>
                        </div>
                    </Link>
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