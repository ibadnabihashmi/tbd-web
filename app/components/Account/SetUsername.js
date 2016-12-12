import React from 'react';
import { connect } from 'react-redux'
import { setUsername } from '../../actions/account';
import Messages from '../Messages';

class SetUsername extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:props.user,
            username:''
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    setUsername(event) {
        event.preventDefault();
        this.props.dispatch(setUsername(this.state.username,this.state.user._id,this.props.token));
    }

    render() {
        return (
            <div className="login-container container">
                <div className="panel">
                    <div className="panel-body">
                        <Messages messages={this.props.messages}/>
                        <form onSubmit={this.setUsername.bind(this)}>
                            <legend>Set username</legend>
                            <div className="form-group">
                                <input type="text" name="username" id="username" placeholder="Username" autoFocus className="form-control" value={this.state.username} onChange={this.handleChange.bind(this)}/>
                            </div>
                            <button type="submit" className="btn btn-success">Set</button>
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

export default connect(mapStateToProps)(SetUsername);
