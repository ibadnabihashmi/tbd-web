import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Messages from './Messages';
import request from 'superagent';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post('http://localhost:3000/api/image/saveImage')
            .field('displayImage', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response) {
                console.log(response);
            }
        });
    }

    render(){
        return(
            <div className="container">
                <Messages messages={this.props.messages}></Messages>
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="panel">
                            <div className="panel-body">
                                <Dropzone
                                    className="dropzone"
                                    onDrop={this.onImageDrop.bind(this)}
                                    multiple={false}
                                    accept="image/*">
                                    <div className="image-upload-text">Drop an image or click to select a file to upload.</div>
                                </Dropzone>
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
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Test);
