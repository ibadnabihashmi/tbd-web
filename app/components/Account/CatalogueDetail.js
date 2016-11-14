import React from 'react';
import { connect } from 'react-redux';
import Messages from '../Messages';
import Dropzone from 'react-dropzone';
import { updateCatalogue, fetchCatalogueDetails } from '../../actions/catalogue';
import Lightbox from 'react-images';

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
            console.log(res);
            this.setState({catalogueName:res.catalogue.name});
            this.setState({cataloguePrice:res.catalogue.price});
            this.setState({catalogueTags:res.catalogue.hashtags.join(' ')});
            this.setState({catalogueDesc:res.catalogue.description});
            res.images.map((image) => {
                this.setSate({
                    images:this.state.images.concat(new Array({
                        src:'http://localhost:3000'+image.source
                    }))
                });
            });
        });
    }

    render(){
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <div className="col-lg-7">
                            <Lightbox
                                images={this.state.images}
                                isOpen={this.state.lightboxIsOpen}
                                onClickPrev={this.gotoPrevLightboxImage}
                                onClickNext={this.gotoNextLightboxImage}
                                onClose={this.closeLightbox}
                            />
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