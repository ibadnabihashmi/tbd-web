import React from 'react';
import { connect } from 'react-redux';
import Messages from '../Messages';
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
            images:[],
            lightboxIsOpen:false,
            currentImage:0,
            display:true
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.triggerLightBox = this.triggerLightBox.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveCatalogue(){
        const data = this.state;
        const promise = this.props.dispatch(updateCatalogue(data));
        promise.then((res) => {
        });
    }

    componentDidMount(){
        const cats = this.props.dispatch(fetchCatalogueDetails(this.state.catalogueId));
        cats.then((res) => {
            var imgees = [];
            res.images.map((image) => {
               imgees.push({
                   src:'http://localhost:3000'+image.source,
                   caption:image.caption
               });
            });
            this.setState({
                images:imgees,
                catalogueName:res.catalogue.name,
                cataloguePrice:res.catalogue.price,
                catalogueTags:res.catalogue.hashtags.join(' '),
                catalogueDesc:res.catalogue.description,
                catalogueViews:res.catalogue.views,
                display:res.catalogue.user+"9090" == this.state.userId ? false : true
            });
        });
    }

    triggerLightBox(index,event){
        event.preventDefault();
        this.setState({
            currentImage:index,
            lightboxIsOpen:true
        })
    }

    gotoPrevious(){
        this.setState({
            currentImage:this.state.currentImage - 1
        });
    }

    gotoNext(){
        this.setState({
            currentImage:this.state.currentImage + 1
        });
    }

    closeLightbox(){
        this.setState({
            currentImage:0,
            lightboxIsOpen:false
        });
    }

    renderGallery(){
        let images = new Array();
        let key = 0;
        this.state.images.forEach((image) => {
            var style = {
                backgroundImage:"url('"+image.src+"') !important"
            };
            images.push(
               <a key={key+"_a"} href="#">
                   <div className="col-md-4 gallery-image" onClick={this.triggerLightBox.bind(this,key)} key={key} style={style}>
                   </div>
               </a>
            );
            key++;
        });
        return images;
    }


    getTags(){
        let tags = new Array();
        let key = 0;
        this.state.catalogueTags.split(' ').forEach((tag) => {
            const tagLink = `http://localhost:3001/tags/${tag}`;
            tags.push(
                <a href={tagLink} key={key+"a"}>
                    <h4 className="tag" key={key}>
                        #{tag}
                    </h4>
                </a>
            );
            key++;
        });

        return tags;
    }

    render(){
        const sidePanel = this.state.display ? (
            <div className="col-lg-5">
                <div className="catalogue-detail">
                    <div>
                        <h1>{this.state.catalogueName}</h1>
                        <p>{this.state.catalogueViews} views</p>
                    </div>
                    <div>
                        <h4>{this.state.cataloguePrice} Rs</h4>
                    </div>
                    <div>
                        <h5>{this.state.catalogueDesc}</h5>
                    </div>
                    {this.getTags()}
                </div>
            </div>
        ) : (
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
        );
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <div className="col-lg-7">
                            <div className="col-md-12">
                                {this.renderGallery()}
                                <Lightbox
                                    images={this.state.images}
                                    currentImage={this.state.currentImage}
                                    isOpen={this.state.lightboxIsOpen}
                                    onClickPrev={this.gotoPrevious}
                                    onClickNext={this.gotoNext}
                                    onClose={this.closeLightbox}
                                />
                            </div>
                        </div>
                        {sidePanel}
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