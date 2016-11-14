import React from 'react';
import { connect } from 'react-redux';
import Messages from '../Messages';
import { updateCatalogue, fetchCatalogueDetails } from '../../actions/catalogue';
import Gallery from 'react-photo-gallery';

class CatalogueDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            catalogueId:props.params.catalogueId,
            catalogueName: '',
            cataloguePrice: '',
            catalogueTags: '',
            catalogueDesc: '',
            userId:props.user._id,
            images:[]
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveCatalogue(){
        const data = this.state;
        const promise = this.props.dispatch(updateCatalogue(data));
        promise.then((res) => {
            console.log(res);
        });
    }

    componentDidMount(){
        const cats = this.props.dispatch(fetchCatalogueDetails(this.state.catalogueId));
        cats.then((res) => {
            var imgees = [];
            res.images.map((image) => {
               imgees.push({
                   src:'http://localhost:3000'+image.source,
                   width:50,
                   height:50,
                   aspectRatio:1,
                   lightboxImage:{
                       src: 'http://localhost:3000'+image.source,
                       caption:image.caption
                   }
               });
            });
            this.setState({
                images:imgees,
                catalogueName:res.catalogue.name,
                cataloguePrice:res.catalogue.price,
                catalogueTags:res.catalogue.hashtags.join(' '),
                catalogueDesc:res.catalogue.description
            });
            console.log(this.state)
        });
    }

    render(){
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <div className="col-lg-7">
                            <Gallery photos={this.state.images} />
                        </div>
                        <div className="col-lg-5">
                            <div className="catalogue-detail">
                                <div className="form-group">
                                    <input type="text" name="catalogueName" id="catalogueName" placeholder="Name" className="form-control" value={this.state.catalogueName} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="cataloguePrice" id="cataloguePrice" placeholder="Price" className="form-control" value={this.state.cataloguePrice} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="catalogueTags" id="catalogueTags" placeholder="Tags" className="form-control" value={this.state.catalogueTags} disabled="true" onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="catalogueDesc" id="catalogueDesc" rows="4" placeholder="Description" className="form-control" value={this.state.catalogueDesc} onChange={this.handleChange.bind(this)}></textarea>
                                </div>
                                <button className="btn tbd-btn" onClick={this.saveCatalogue.bind(this)}>save</button>
                            </div>
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

export default connect(mapStateToProps)(CatalogueDetail);