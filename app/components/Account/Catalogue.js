import React from 'react';
import { connect } from 'react-redux';
import { Modal ,Header ,Title ,Footer ,Button ,Body} from 'react-bootstrap';
import { saveCatalogue } from '../../actions/catalogue';

class Catalogue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            catalogueName: '',
            catalogueDesc: '',
            userId: props.user._id
        }
    }
    addCatalogue(){
        this.setState({showModal: true});
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    saveCatalogue(){
        const result = this.props.dispatch(saveCatalogue(
            this.state.catalogueName,
            this.state.catalogueDesc,
            this.state.userId
        ));
        result.then((json) => {
            console.log(json);
        });
        this.setState({showModal: false});
    }
    close(){
        this.setState({showModal: false});
    }
    render(){
        return(
            <div className="container">
                <div className="panel">
                    <div className="panel-body">
                        <a onClick={this.addCatalogue.bind(this)} href="#">
                            <div className="col-md-3 text-center catalogue-add-btn">
                                add catalogue +
                            </div>
                        </a>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add catalogue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="catalogueName">Name</label>
                            <input type="text" name="catalogueName" id="catalogueName" placeholder="Name" autoFocus className="form-control" value={this.state.catalogueName} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="catalogueDesc">Description</label>
                            <textarea type="text" name="catalogueDesc" id="catalogueDesc" rows="4" placeholder="Desccription" autoFocus className="form-control" value={this.state.catalogueDesc} onChange={this.handleChange.bind(this)}></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveCatalogue.bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal>
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

export default connect(mapStateToProps)(Catalogue);