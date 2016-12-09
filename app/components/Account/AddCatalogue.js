import React from 'react';
import { connect } from 'react-redux';
import Messages from '../Messages';
import Dropzone from 'react-dropzone';
import { saveCatalogue } from '../../actions/catalogue';

class AddCatalogue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId:props.user._id,
            image1p:undefined,
            image2p:undefined,
            image3p:undefined,
            image4p:undefined
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveCatalogue(){
        const data = this.state;
        this.props.dispatch(saveCatalogue(data));
    }

    onImageDrop1(files){
        this.setState({
            image1: files[0],
            image1p: files[0].preview
        });
    }

    onImageDrop2(files){
        this.setState({
            image2: files[0],
            image2p: files[0].preview
        });
    }

    onImageDrop3(files){
        this.setState({
            image3: files[0],
            image3p: files[0].preview
        });
    }

    onImageDrop4(files){
        this.setState({
            image4: files[0],
            image4p: files[0].preview
        });
    }

    render(){
        return (
            <div className="container">
                <Messages messages={this.props.messages}></Messages>
                <div className="panel">
                    <div className="panel-body">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div>
                                <div className="form-group">
                                    <input type="text" name="catalogueName" id="catalogueName" placeholder="Name" className="form-control" value={this.state.catalogueName} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="cataloguePrice" id="cataloguePrice" placeholder="Price" className="form-control" value={this.state.cataloguePrice} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="catalogueDesc" id="catalogueDesc" rows="4" placeholder="Description" className="form-control" value={this.state.catalogueDesc} onChange={this.handleChange.bind(this)}></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <img
                                          src={this.state.image1p}
                                          width={509}
                                        />
                                        <Dropzone
                                            className="dropzone"
                                            onDrop={this.onImageDrop1.bind(this)}
                                            multiple={false}
                                            accept="image/*">
                                            <div className="image-upload-text">Drop image or click to select image to upload</div>
                                        </Dropzone>
                                        <div className="form-group">
                                            <input type="text" name="image1tags" id="image1tags" placeholder="Tags" className="form-control" value={this.state.image1tags} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="image1caption" id="image1caption" placeholder="Caption" className="form-control" value={this.state.image1caption} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <img
                                          src={this.state.image2p}
                                          width={509}
                                        />
                                        <Dropzone
                                            className="dropzone"
                                            onDrop={this.onImageDrop2.bind(this)}
                                            multiple={false}
                                            accept="image/*">
                                            <div className="image-upload-text">Drop image or click to select image to upload</div>
                                        </Dropzone>
                                        <div className="form-group">
                                            <input type="text" name="image2tags" id="image2tags" placeholder="Tags" className="form-control" value={this.state.image2tags} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="image2caption" id="image2caption" placeholder="Caption" className="form-control" value={this.state.image2caption} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <img
                                          src={this.state.image3p}
                                          width={509}
                                        />
                                        <Dropzone
                                            className="dropzone"
                                            onDrop={this.onImageDrop3.bind(this)}
                                            multiple={false}
                                            accept="image/*">
                                            <div className="image-upload-text">Drop image or click to select image to upload</div>
                                        </Dropzone>
                                        <div className="form-group">
                                            <input type="text" name="image3tags" id="image3tags" placeholder="Tags" className="form-control" value={this.state.image3tags} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="image3caption" id="image3caption" placeholder="Caption" className="form-control" value={this.state.image3caption} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <img
                                          src={this.state.image4p}
                                          width={509}
                                        />
                                        <Dropzone
                                            className="dropzone"
                                            onDrop={this.onImageDrop4.bind(this)}
                                            multiple={false}
                                            accept="image/*">
                                            <div className="image-upload-text">Drop image or click to select image to upload</div>
                                        </Dropzone>
                                        <div className="form-group">
                                            <input type="text" name="image4tags" id="image4tags" placeholder="Tags" className="form-control" value={this.state.image4tags} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="image4caption" id="image4caption" placeholder="Caption" className="form-control" value={this.state.image4caption} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn tbd-btn width-100" onClick={this.saveCatalogue.bind(this)}>save</button>
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

export default connect(mapStateToProps)(AddCatalogue);