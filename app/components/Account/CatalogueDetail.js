import React from 'react';
import { connect } from 'react-redux';
import Messages from '../Messages';
import Dropzone from 'react-dropzone';
import { updateCatalogue, fetchCatalogueDetails } from '../../actions/catalogue';

class CatalogueDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            catalogueId:props.params.catalogueId,
            catalogueName: '',
            cataloguePrice: '',
            catalogueTags: '',
            catalogueDesc: '',
            catalogueImages: [],
            userId:props.user._id
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveCatalogue(){
        const data = this.state;
        console.log(data);
        // const promise = this.props.dispatch(updateCatalogue(data));
        // promise.then((res) => {
        //     console.log(res);
        // });
    }

    onImageDrop(files){
        this.setState({
            catalogueImages:this.state.catalogueImages.concat(new Array(files[0]))
        });
    }

    componentDidMount(){
        const cats = this.props.dispatch(fetchCatalogueDetails(this.state.catalogueId));
        cats.then((res) => {
            this.setState({catalogueName:res.catalogue.name});
            this.setState({cataloguePrice:res.catalogue.price});
            this.setState({catalogueTags:res.catalogue.hashtags.join(' ')});
            this.setState({catalogueDesc:res.catalogue.description});
        });
    }

    render(){
        return (
            <div className="container">
                <Messages messages={this.props.messages}></Messages>
                <div className="panel">
                    <div className="panel-body">
                        <div className="col-lg-7">

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