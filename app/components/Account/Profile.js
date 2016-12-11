import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, updatePicture, changePassword ,saveTag } from '../../actions/account';
import Messages from '../Messages';
import Dropzone from 'react-dropzone';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.user._id,
            email: props.user.email,
            name: props.user.name,
            username: props.user.username,
            gender: props.user.gender,
            location: props.user.location,
            website: props.user.website,
            gravatar: props.user.gravatar,
            picture: props.user.socialAuthPic?props.user.socialAuthPic:
            props.user.picture?'http://localhost:3000/'+props.user.picture:undefined,
            password: '',
            confirm: ''
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleProfileUpdate(event) {
        event.preventDefault();
        this.props.dispatch(updateProfile(this.state, this.props.token));
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.state.userId, this.props.token));
    }

    onImageDrop(files){
        let response = this.props.dispatch(updatePicture(files[0],this.state.userId));
        this.setState({
            picture:files[0].preview
        });
    }

    isPicturePresent(){
        if(this.state.picture != undefined){
            return (
                <div>
                    <img
                        src={this.state.picture}
                        width={353}
                    />
                    <Dropzone
                        className="dropzone"
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        accept="image/*">
                        <div className="image-upload-text">Drop image or click to select image to upload</div>
                    </Dropzone>
                </div>
            );
        }else{
            return(
                <div>
                    <Dropzone
                        className="dropzone"
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        accept="image/*">
                        <div className="image-upload-text">Drop image or click to select image to upload</div>
                    </Dropzone>
                </div>
            );
        }
    }

    saveTag(event){
        event.preventDefault();
        let promise = this.props.dispatch(saveTag(this.state.tag,this.state.userId));
        promise.then((json) => {
            console.log(json);
        });
    }

    render() {
        return (
            <div className="container col-lg-6 col-lg-offset-3">
                <div className="panel">
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.handleProfileUpdate.bind(this)} className="form-horizontal">
                            <legend>Profile Information</legend>
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-3">Email</label>
                                <div className="col-sm-7">
                                    <input type="email" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-7">
                                    <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="col-sm-3">Username</label>
                                <div className="col-sm-7">
                                    <input type="text" name="username" id="username" className="form-control" value={this.state.username} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3">Gender</label>
                                <div className="col-sm-4">
                                    <label className="radio-inline radio col-sm-4">
                                        <input type="radio" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/><span>Male</span>
                                    </label>
                                    <label className="radio-inline col-sm-4">
                                        <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/><span>Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="location" className="col-sm-3">Location</label>
                                <div className="col-sm-7">
                                    <input type="text" name="location" id="location" className="form-control" value={this.state.location} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="website" className="col-sm-3">Website</label>
                                <div className="col-sm-7">
                                    <input type="text" name="website" id="website" className="form-control" value={this.state.website} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-7">
                                    {this.isPicturePresent()}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-3 col-sm-4">
                                    <button type="submit" className="btn btn-success">Update Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-body">
                        <form onSubmit={this.saveTag.bind(this)} className="form-horizontal">
                            <legend>Preferences</legend>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-3">Add tags</label>
                                <div className="col-sm-7">
                                    <input type="text" name="tag" id="tag" className="form-control" value={this.state.tag} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="col-sm-2">
                                    <button type="submit" className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-body">
                        <form onSubmit={this.handleChangePassword.bind(this)} className="form-horizontal">
                            <legend>Change Password</legend>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-3">New Password</label>
                                <div className="col-sm-7">
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm" className="col-sm-3">Confirm Password</label>
                                <div className="col-sm-7">
                                    <input type="password" name="confirm" id="confirm" className="form-control" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-4 col-sm-offset-3">
                                    <button type="submit" className="btn btn-success">Change Password</button>
                                </div>
                            </div>
                        </form>
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

export default connect(mapStateToProps)(Profile);
